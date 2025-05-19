import asyncio
import logging
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_anthropic import ChatAnthropic
from langchain.schema import HumanMessage, SystemMessage  # SystemMessage import 추가
from typing import Optional, List, Dict, Any
import os

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("mcp-client")

# MCP 서버 URL 설정 (실제 서버 주소로 변경하세요)
# 서버가 로컬호스트에서 실행 중인 경우 아래 URL을 사용

# Anthropic API 키 설정
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

class MCPClientManager:
    def __init__(self):
        self.client = None
        self.agent = None
        self.model = None
        self.tools = []
        self.is_initialized = False
        self.initialization_lock = asyncio.Lock()
        self.sse_connected = False
        self._reconnect_task = None
    
    async def initialize(self):
        # 동시 초기화 방지를 위한 락
        async with self.initialization_lock:
            if self.is_initialized:
                return
                
            try:
                # 모델 초기화
                logger.info("Claude 모델 초기화 중...")
                self.model = ChatAnthropic(
                    model_name="claude-3-7-sonnet-latest",
                    api_key=ANTHROPIC_API_KEY
                )
                
                # MCP 클라이언트 설정 및 연결
                logger.info(f"MCP 서버({"http://43.203.122.79:8000/sse"})에 연결 시도 중...")
                self.client = MultiServerMCPClient(
                    {
                        "alphaMail": {
                            "url": "http://43.203.122.79:8000/sse",
                            "transport": "sse",
                        }
                    }
                )
                
                # 클라이언트 연결
                await self.client.__aenter__()
                
                # 도구 가져오기
                self.tools = self.client.get_tools()
                logger.info(f"사용 가능한 도구: {[tool.name for tool in self.tools]}")
                
                if not self.tools:
                    logger.warning("사용 가능한 도구가 없습니다.")

                # ReAct 에이전트 생성
                self.agent = create_react_agent(self.model, self.tools)
                self.is_initialized = True
                logger.info("MCP 클라이언트 초기화 완료")
                
                if self._reconnect_task is None:
                    self._reconnect_task = asyncio.create_task(self.maintain_sse_connection())
                
            except Exception as e:
                logger.error(f"MCP 클라이언트 초기화 오류: {str(e)}")
                if self.client:
                    await self.client.__aexit__(None, None, None)
                raise e
    
    async def cleanup(self):
        if self.client:
            try:
                await self.client.__aexit__(None, None, None)
                self.is_initialized = False
                logger.info("MCP 클라이언트 종료됨")
                if self._reconnect_task:
                    self._reconnect_task.cancel()
                    self._reconnect_task = None
            except Exception as e:
                logger.error(f"MCP 클라이언트 종료 오류: {str(e)}")
    
    async def process_query(self, query: str) -> Dict[str, Any]:

        SYSTEM_PROMPT = """
                다음 이메일 내용을 분석해 업무 관련 일정, 발주 요청, 견적 요청과 같은 업무 관련 정보를 추출합니다. 

                - 메일에서 같은 건에 대해서는 (예: 같은 발주 번호, 같은 일정, 같은 요청 항목)이 **한 번만 등록**되도록 합니다.
                - 중복 여부는 name, title, 발주서 번호, 날짜, 제품명, 요청 수량, 단가 등의 주요 키 정보를 기준으로 판단합니다.
                - 중복된 내용으로 여러 번 tool call이 발생하지 않도록 유의합니다.
                예를 들어, 다음과 같은 두 문장은 같은 건으로 간주해야 하며 중복 등록하지 않습니다:

                - "A사로 5월 25일까지 100개 납품 요청드립니다."
                - "A사 건은 지난 메일에 언급했듯이 5월 25일까지 100개 납품 부탁드립니다."

                """
        
        if not self.is_initialized:
            await self.initialize()
                
        try:

            # 쿼리 변수명 수정
            response = await self.agent.ainvoke({"messages": [
                SystemMessage(content=SYSTEM_PROMPT),
                HumanMessage(content=query)
                ]})



            # 항상 일정한 반환 구조 유지
            result = {
                "tool_results": [],
                "llm_response": response
            }

            for msg in response.get("messages", []):
                if hasattr(msg, 'tool_calls') and msg.tool_calls:
                    for call in msg.tool_calls:
                        tool = next((t for t in self.tools if t.name == call['name']), None)
                        if tool:
                            server_response = await tool.coroutine(call['args'])
                            result["tool_results"].append({
                                "tool": call['name'],
                                "result": server_response
                            })
                        else:
                            result["tool_results"].append({
                                "tool": call['name'],
                                "error": f"도구 '{call['name']}'을(를) 찾을 수 없습니다."
                            })
            return result

        except Exception as e:
            logger.error(f"쿼리 처리 오류: {str(e)}")
            return {
                "error": str(e)
            }

    async def connect_sse(self):
        try:
            # 실제 SSE 연결 시도 코드
            # 예: self.sse_client = await SomeSSEClient.connect(...)
            self.sse_connected = True
            print("SSE 연결 성공")
        except Exception as e:
            self.sse_connected = False
            print(f"SSE 연결 실패: {e}")

    async def maintain_sse_connection(self):
        while True:
            if not self.sse_connected:
                await self.connect_sse()
            await asyncio.sleep(5)  # 5초마다 체크
