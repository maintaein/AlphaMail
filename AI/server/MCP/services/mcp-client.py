from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent

from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="mistralai/Mathstral-7B-v0.1",
    openai_api_base="http://localhost:8000/v1",  # llm_server.py에서 띄운 vllm 주소
)


async with MultiServerMCPClient(
    llm=llm,
    tools=tools,
    system_message=system_message,
    allowed_tools=allowed_tool_names,
) as client:
    await client.connect()
