import asyncio
from langchain_openai import ChatOpenAI
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate

try:
    from langchain.agents import initialize_agent, AgentType
except ImportError:
    from langchain_core.agents import initialize_agent, AgentType

# === System Message ===
final_system_message = """
메일 내용을 읽고 발주 요청, 견적 요청, 일정 세 개 중 속하는 게 있는지 확인해.
그리고 해당되는 모든 도구를 실행해.

도구 사용 기준:
1. 일정 정보가 있으면 → "date" 도구 호출
2. 발주 요청 포함 → "orderRequest" 도구 호출
3. 견적 요청 포함 → "estimateRequest" 도구 호출

예시:
이메일:
> 5월 6일 오전 10시에 회의가 있습니다.
> 아래 품목을 발주합니다: 프린터 2대, 토너 10개.
> 견적서도 부탁드립니다.

도구 호출: "orderRequest", "date", "estimateRequest"
""".strip()

# === LLM 정의 ===
llm = ChatOpenAI(
    openai_api_base="http://localhost:8000/v1",
    openai_api_key="EMPTY",
    model_name="mistralai/Mathstral-7B-v0.1",
    temperature=0
)

# 시스템 메시지를 프롬프트 템플릿으로 설정
prompt = ChatPromptTemplate.from_messages([
    ("system", final_system_message),
    ("human", "{input}")
])

async def run_agent():
    # === MCP Tool 서버 연결 (비동기 컨텍스트 매니저 사용) ===
    async with MultiServerMCPClient({
        "tools": {
            "url": "http://43.203.122.79:8000/sse",  # 포트를 8080에서 8000으로 수정
            "transport": "sse"
        }
    }) as client:
        # 도구 가져오기
        tools = client.get_tools()
        
        # 에이전트 초기화 (ReAct 스타일 에이전트)
        agent = initialize_agent(
            tools=tools,
            llm=llm,
            agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
            agent_kwargs={"system_message": final_system_message}  # 여기에 시스템 메시지 전달
        )
        
        # 테스트 이메일로 에이전트 실행
        test_email = """
        5월 6일 오전 10시에 회의가 있습니다.
        아래 품목을 발주합니다: 프린터 2대, 토너 10개.
        견적서도 부탁드립니다.
        """
        
        # 경고 메시지를 피하기 위해 arun 대신 ainvoke 사용
        response = await agent.ainvoke({"input": test_email})
        print(response)

if __name__ == "__main__":
    print("🚀 MCP Agent running at http://0.0.0.0:3333")
    # 비동기 함수 실행
    asyncio.run(run_agent())