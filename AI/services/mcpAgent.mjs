import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { loadMcpTools } from "@langchain/mcp-adapters";

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
  - title: 일정 요약
  - start: ISO8601 일정 시작 날짜 ("2025-04-30T14:00:00")
  - end: ISO8601 일정 종료 날짜
  - description: 일정에 대한 기타 사항
  
  날짜는 반드시 ISO8601 형식으로 보내십시오.
  일정 관련 정보가 있다면 이를 추출하세요.
  이메일에서 명시적인 종료 시간이 없는 경우, 시작 시간에서 1시간 후로 설정하십시오.
  `.trim(),
  };


  const transport = new SSEClientTransport(new URL("http://localhost:8080/sse"));
  const client = new Client({ name: "math-client", version: "1.0.0" });
  
  let agent = null;
  
  export async function getMcpAgent() {
    if (agent) return agent;
  
    await client.connect(transport);
    const tools = await loadMcpTools("math", client, {
      throwOnLoadError: true,
      prefixToolNameWithServerName: false,
      additionalToolNamePrefix: "",
    });
  
    const allowedToolNames = tools.map((tool) => tool.name);
  // 다음 도구만 사용할 수 있습니다: ${allowedToolNames.join(", ")}.
  const finalSystemMessage = `
  당신은 이메일을 분석하여 적절한 정보를 추출하는 한국어 AI 비서입니다.
  이메일에 발주서 관련 내용이 있는지, 견적서 관련 내용이 있는지, 일정 관련 내용이 있는지 판단하세요.
  그리고 관련 내용에 대해서 모든 도구를 호출해서 아래 내용 및 도구별 지침을 따르세요
  일정 도구는 무조건 사용하세요.

  1. 발주(주문) 관련 이메일이면 orderRequest 도구를 사용하세요.
  2. 견적 요청 관련 이메일이면 estimateRequest 도구를 사용하세요.
  3. 일정 관련 정보가 있으면 calendar 도구를 사용하세요.
  
  도구별 지침:
  ${allowedToolNames.map((tool) => `### ${tool}\n${toolSystemMessages[tool] || ""}`).join("\n\n")}
  `.trim();

  agent = createReactAgent({
    llm: new ChatOpenAI({
      apiKey: "lm-studio",
      model: "mathstral-7b-v0.1",
      configuration: { baseURL: "http://localhost:1234/v1" },
      modelKwargs: { systemMessage: "" }
    }),
    tools,
    systemMessage: finalSystemMessage,
    allowedTools: allowedToolNames,
  });

  console.log("✅ MCP Agent initialized.");
  return agent;
}
