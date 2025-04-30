// test-client.mjs

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { loadMcpTools } from "@langchain/mcp-adapters";

// 모델 설정
const model = new ChatOpenAI({
  apiKey: "lm-studio",
  model: "bartowski/llama-3.2-korean-bllossom-3b",
  configuration: {
    baseURL: "http://localhost:1234/v1",
  },
  modelKwargs: {
    systemMessage: ``
  },
});

// MCP 서버 연결
const transport = new SSEClientTransport(new URL("http://localhost:8080/sse"));
const client = new Client({
  name: "math-client",
  version: "1.0.0",
});


const toolSystemMessages = {
  orderRequest: `
당신은 이메일을 분석하여 발주 정보를 추출하는 AI입니다. 다음 형식으로 정확히 추출하세요:

company: 이메일에서 언급된 회사명
contactName: 담당자 이름
contactEmail: 담당자 이메일
paymentTerms: 결제 조건
deliveryAddress: 배송지 주소
deliveryDate: 배송 날짜
items: 주문 항목 배열

※ 주의: items 필드는 다음과 같이 작성하세요:
[
  {
    "name": "27인치 FHD IPS 모니터 (모델명: BDM-270F)",
    "quantity": 100
  }
]

quantity는 반드시 문자열이 아닌 숫자로 작성해야 합니다.
items는 문자열이 아닌 실제 배열 형태여야 합니다.

이메일에 일정 및 날짜 관련 정보가 있다면 이를 함께 모두 추출하세요.
`.trim(),

  estimateRequest: `
당신은 이메일을 분석하여 견적 요청 정보를 추출하는 AI입니다. 다음 형식으로 정확히 추출하세요:

company: 이메일에서 언급된 회사명
deliveryAddress: 배송지 주소
items: 주문 항목 배열

※ 주의: items 필드는 다음과 같이 작성하세요:
[
  {
    "name": "27인치 FHD IPS 모니터 (모델명: BDM-270F)",
    "quantity": 100
  }
]

quantity는 반드시 문자열이 아닌 숫자로 작성해야 합니다.
items는 문자열이 아닌 실제 배열 형태여야 합니다.

이메일에 일정 관련 정보가 있다면 이를 함께 추출하세요.
`.trim(),

  calendar: `
메일을 분석하여 다음 항목을 정확히 추출하여 JSON으로 응답하십시오.
- title: 문자열
- start: ISO8601 형식 날짜 ("2025-04-30T14:00:00")
- end: ISO8601 형식 날짜
- description: 문자열 (선택사항)

날짜는 반드시 ISO8601 형식으로 보내십시오.
일정 관련 정보가 있다면 이를 추출하세요.
이메일에서 명시적인 종료 시간이 없는 경우, 시작 시간에서 1시간 후로 설정하십시오.
`.trim(),
};


// 서버 앱 생성
const app = express();
app.use(cors());
app.use(bodyParser.json());

let agent = null;

// 서버 시작 시 MCP 연결 및 agent 준비
async function initializeAgent() {
  await client.connect(transport);
  const tools = await loadMcpTools("math", client, {
    throwOnLoadError: true,
    prefixToolNameWithServerName: false,
    additionalToolNamePrefix: "",
  });

  const allowedToolNames = tools.map((tool) => tool.name);
 const finalSystemMessage = `
당신은 이메일을 분석하여 적절한 정보를 추출하는 한국어 AI 비서입니다.
다음 도구만 사용할 수 있습니다: ${allowedToolNames.join(", ")}.

중요 사항:
1. 이메일 내용을 분석하여 적절한 도구를 결정하고 호출하세요.
2. 발주(주문) 관련 이메일이면 orderRequest 도구를 사용하세요.
3. 견적 요청 관련 이메일이면 estimateRequest 도구를 사용하세요.
4. 일정 관련 정보가 있으면 calendar 도구를 사용하세요.
5. 한 이메일에 여러 유형의 정보가 있을 경우 해당되는 모든 도구를 순차적으로 사용하세요.
6. 일정 도구를 필수적으로 사용하세요. 일정이 여러개 있다면 모두를 여러번 사용하세요.

도구별 지침:
${allowedToolNames.map((tool) => `### ${tool}\n${toolSystemMessages[tool] || ""}`).join("\n\n")}

추가 지침:
- 도구 호출 시 문자열로 된 JSON 배열이 아닌 실제 배열 객체를 전달하세요.
  예: "items": [{"name": "모니터", "quantity": 100}]
  틀린 예: "items": "[{\\"name\\": \\"모니터\\", \\"quantity\\": 100}]"
  
- 숫자는 문자열이 아닌 실제 숫자로 전달하세요.
  예: "quantity": 100
  틀린 예: "quantity": "100"
`.trim();

  agent = createReactAgent({
    llm: model,
    tools,
    systemMessage: finalSystemMessage,
    allowedTools: allowedToolNames,
  });

  console.log("MCP Agent initialized.");
}

// === POST /mail ===
app.post("/mail", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Missing 'content' in request body." });
  }

  try {
    const response = await agent.invoke({
      messages: [{ role: "user", content }],
    });

    res.json({ result: response });
  } catch (err) {
    console.error("Agent invoke error:", err);
    res.status(500).json({ error: "Failed to process email." });
  }
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, async () => {
  await initializeAgent();
  console.log(`Server is running on http://localhost:${PORT}`);
});