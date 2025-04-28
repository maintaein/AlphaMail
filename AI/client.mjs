// test-client.mjs
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { loadMcpTools } from "@langchain/mcp-adapters";

// 모델 설정
const model = new ChatOpenAI({
  apiKey: "lm-studio",  // LM Studio 토큰 이름으로 쓰지만, 실제 인증은 안 함
  model: "lmstudio-community/Mistral-7B-Instruct-v0.3-GGUF",
  configuration: {
    baseURL: "http://localhost:1234/v1",
  },
  modelKwargs: {
    systemMessage: "",  // LangChain이 system message 자동 삽입하는 거 방지
  },
});

// MCP 서버 연결 (SSE 방식)
const transport = new SSEClientTransport(new URL("http://localhost:8080/sse"));
const client = new Client({
  name: "math-client",
  version: "1.0.0",
});

try {
  await client.connect(transport);

  // MCP 서버에서 tools 불러오기
  const tools = await loadMcpTools("math", client, {
    throwOnLoadError: true,
    prefixToolNameWithServerName: false,
    additionalToolNamePrefix: "",
  });

  // agent 생성
  const agent = createReactAgent({
    llm: model,
    tools,
    systemMessage: `당신은 반드시 사용자 질문을 해결하기 위해 제공된 도구만을 사용해야 합니다.
스스로 계산하거나 추론하지 말고, 항상 적절한 도구를 선택하여 호출해야 합니다.
`,
  });

  // agent 실행
  const agentResponse = await agent.invoke({
    messages: [{ role: "user", content: " 3 하고 5를 더하고 그다음 12를 곱해 " }],
  });
  
  console.log("Agent Final Response:", agentResponse);

} catch (e) {
  console.error("Error occurred:", e);
} finally {
  console.log("Closing client...");
  await client.close();
}
