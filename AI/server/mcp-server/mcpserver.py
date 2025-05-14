import os
import asyncio
import logging
import httpx
import time
from fastmcp import FastMCP
from pydantic import Field
from typing import Annotated, List, Optional

# 로깅 설정
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# FastMCP 관련 로깅 활성화
for log_name in ['fastmcp', 'mcp', 'uvicorn', 'fastapi']:
    logging.getLogger(log_name).setLevel(logging.DEBUG)

# 환경 변수
ALPHAMAIL_BASE_URL = os.getenv("ALPHAMAIL_BASE_URL", "http://localhost:8080")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
REQUEST_TIMEOUT = float(os.getenv("REQUEST_TIMEOUT", 10.0))

# MCP 서버 인스턴스 생성
mcp = FastMCP("AlphaMail MCP Server")

# === 도구 정의 ===
@mcp.tool()
def date(
    start: Annotated[str, Field(description="일정 시작 일자 (예: '2025-05-10T10:00:00')")],
    end: Annotated[str, Field(description="일정 종료 일자 (예: '2024-05-11T11:30:00')")],
    user_email : Annotated[str, Field(description="받은 사람의 이메일 (예:'test@alphamail.my')")],
    title: Annotated[Optional[str], Field(description="일정 제목", default=None)] = None,
    description: Annotated[Optional[str], Field(description="일정 설명", default=None)] = None
):
    """
    메일 본문에서 일정 관련 날짜 및 제목 정보를 추출하여 일정을 생성합니다.
    사용 조건:
    - 이메일에 회의, 약속, 행사 등 일정이 포함된 경우.
    - 날짜(start, end) 정보가 명확히 존재할 것.
    """
    try:
        logger.info(f"일정 생성 요청: {title} ({start} ~ {end})")
        response = httpx.post(
            f"{ALPHAMAIL_BASE_URL}/api/assistants/schedules",
            json={
                "name" : title,
                "start": start,
                "end": end,
                "description": description,
                "userEmail" : user_email
            },
            timeout=REQUEST_TIMEOUT
        )
        response.raise_for_status()
        logger.info("일정 정보 전송 성공")
        return {
            "message": "일정 정보가 정상적으로 외부 시스템에 전송되었습니다.",
            "response": response.json()
        }
    except Exception as e:
        logger.error(f"일정 정보 전송 실패: {str(e)}")
        return {
            "message": f"외부 시스템 전송 중 오류가 발생했습니다: {str(e)}",
            "error": True,
            "data": {}
        }

@mcp.tool()
def orderRequest(
    company: Annotated[str, Field(description="발주 대상 거래처 회사명")],
    contactName: Annotated[str, Field(description="담당자 이름")],
    contactEmail: Annotated[str, Field(description="담당자 이메일 주소")],
    paymentTerms: Annotated[str, Field(description="결제 조건 (예: 선불, 후불, 30일 내 결제 등)")],
    deliveryAddress: Annotated[str, Field(description="배송 주소")],
    deliveryDate: Annotated[str, Field(description="배송 예정일 (예: '2024-05-15')")],
    items: Annotated[List[dict], Field(description="발주 품목 목록 (예: [{'name': '프린터', 'quantity': 2}])")]
):
    """
    이메일에서 발주 요청 정보를 구조화하여 추출합니다.
    사용 조건:
    - 메일 본문에 품목 주문, 수량, 배송 정보 등이 명시되어 있는 경우.
    """
    try:
        logger.info(f"발주 요청: {company}, 품목 수: {len(items)}")
        response = httpx.post(
            f"{ALPHAMAIL_BASE_URL}/api/erp/purchase-orders",
            json={
                "company": company,
                "contactName": contactName,
                "contactEmail": contactEmail,
                "paymentTerms": paymentTerms,
                "deliveryAddress": deliveryAddress,
                "deliveryDate": deliveryDate,
                "items": items
            },
            timeout=REQUEST_TIMEOUT
        )
        response.raise_for_status()
        logger.info("발주 정보 전송 성공")
        return {
            "message": "발주 정보가 정상적으로 외부 시스템에 전송되었습니다.",
            "response": response.json()
        }
    except Exception as e:
        logger.error(f"발주 정보 전송 실패: {str(e)}")
        return {
            "message": f"외부 시스템 전송 중 오류가 발생했습니다: {str(e)}",
            "error": True,
            "data": {}
        }

@mcp.tool()
def estimateRequest(
    items: Annotated[List[dict], Field(description="견적 요청 품목 목록 (예: [{'name': '노트북', 'quantity': 5}])")],
    company: Annotated[Optional[str], Field(description="요청 업체명", default=None)] = None,
    deliveryAddress: Annotated[Optional[str], Field(description="납품 요청 주소", default=None)] = None
):
    """
    이메일에서 견적 요청 관련 정보를 추출합니다.
    사용 조건:
    - 품목에 대한 가격 견적을 요청하는 내용이 포함되어 있을 경우.
    """
    try:
        logger.info(f"견적 요청: 업체: {company}, 품목 수: {len(items)}")
        response = httpx.post(
            f"{ALPHAMAIL_BASE_URL}/api/erp/estimates",
            json={
                "company": company,
                "deliveryAddress": deliveryAddress,
                "items": items
            },
            timeout=REQUEST_TIMEOUT
        )
        response.raise_for_status()
        logger.info("견적 정보 전송 성공")
        return {
            "message": "견적 정보가 정상적으로 외부 시스템에 전송되었습니다.",
            "response": response.json()
        }
    except Exception as e:
        logger.error(f"견적 정보 전송 실패: {str(e)}")
        return {
            "message": f"외부 시스템 전송 중 오류가 발생했습니다: {str(e)}",
            "error": True,
            "data": {}
        }

# === 메인 실행 부분 ===
if __name__ == "__main__":
    try:
        logger.info(f"FastMCP 서버를 {HOST}:{PORT}에서 시작합니다...")

        # FastMCP의 기본 실행 메서드 사용
        # 특별한 구성 없이 기본 설정 사용
        logger.info("FastMCP의 기본 run() 메서드를 사용합니다.")
        mcp.run()

        # 서버가 백그라운드에서 실행될 경우 메인 프로세스 유지
        logger.info("메인 프로세스를 유지합니다...")

        while True:
            # 30초마다 서버 상태 확인 및 로그 출력
            logger.info("서버 실행 중...")
            time.sleep(30)

    except KeyboardInterrupt:
        logger.info("서버가 키보드 인터럽트로 종료됩니다.")
    except Exception as e:
        logger.error(f"서버 실행 중 오류 발생: {e}", exc_info=True)
        import sys
        sys.exit(1)