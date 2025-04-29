// test-client.mjs

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { loadMcpTools } from "@langchain/mcp-adapters";

// 모델 설정
const model = new ChatOpenAI({
  apiKey: "lm-studio",
  model: "lmstudio-community/mathstral-7B-v0.1-GGUF",
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

이메일에 일정 관련 정보가 있다면 이를 함께 추출하세요.
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
이메일에서 명시적인 종료 시간이 없는 경우, 시작 시간에서 1시간 후로 설정하십시오.
`.trim(),
};


try {
  await client.connect(transport);

  // MCP 서버에서 tools 불러오기
  const tools = await loadMcpTools("math", client, {
    throwOnLoadError: true,
    prefixToolNameWithServerName: false,
    additionalToolNamePrefix: "",
  });

  const allowedToolNames = tools.map((tool) => tool.name); 
  console.log("Loaded tools:", allowedToolNames); 


  const finalSystemMessage = `
당신은 이메일을 분석하여 적절한 정보를 추출하는 한국어 AI 비서입니다.
다음 도구만 사용할 수 있습니다: ${allowedToolNames.join(", ")}.

중요 사항:
1. 이메일 내용을 분석하여 적절한 도구를 결정하고 호출하세요.
2. 발주(주문) 관련 이메일이면 orderRequest 도구를 사용하세요.
3. 견적 요청 관련 이메일이면 estimateRequest 도구를 사용하세요.
4. 일정 관련 정보가 있으면 calendar 도구를 사용하세요.
5. 한 이메일에 여러 유형의 정보가 있을 경우 해당되는 모든 도구를 순차적으로 사용하세요.

도구별 지침:
${allowedToolNames.map((tool) => `### ${tool}\n${toolSystemMessages[tool] || ""}`).join("\n\n")}

추가 지침:
- 도구 호출 시 문자열로 된 JSON 배열이 아닌 실제 배열 객체를 전달하세요.
  예: "items": [{"name": "모니터", "quantity": 100}]
  틀린 예: "items": "[{\\"name\\": \\"모니터\\", \\"quantity\\": 100}]"
  
- 숫자는 문자열이 아닌 실제 숫자로 전달하세요.
  예: "quantity": 100
  틀린 예: "quantity": "100"

- 도구 호출 결과를 사용자에게 보여주세요.
- 이메일이 어떤 도구와도 맞지 않는다면, 사용자에게 직접 답변하세요.
- 이메일에 일정 정보(미팅, 회의, 약속, 날짜 등)가 포함되어 있다면 calendar 도구를 함께 사용하세요.
- 동일한 이메일에서 발주/견적 정보와 일정 정보를 모두 추출해야 할 경우, 두 도구를 모두 사용하세요.
`.trim();

  // agent 생성 - 최대 반복 횟수와 도구 사용 수 증가
  const agent = createReactAgent({
    llm: model,
    tools,
    systemMessage: finalSystemMessage,
    allowedTools: allowedToolNames,
    maxIterations: 5,  // 증가: 더 많은 도구를 순차적으로 사용할 수 있도록
    maxToolsPerRun: 3, // 증가: 한 번에 여러 도구를 사용할 수 있도록
  });

  // agent 실행
  const agentResponse = await agent.invoke({ 
    messages: [
      {
        role: "user",
        content: `
제목: [발주 요청] ABC 전자 – 모니터 27인치 모델 발주 요청의 건

보낸사람: 김현우 과장 (hw.kim@alphamail.co.kr)
받는사람: sales@bestdisplay.co.kr

안녕하세요,
ABC전자 구매팀 김현우 과장입니다.

귀사의 모니터 제품 관련하여 아래와 같이 발주를 요청드리고자 합니다.

■ 발주 요청 정보

회사명: ABC전자㈜

결제 조건: 납품 후 익월 25일 지급 (세금계산서 기준)

납기일: 2025년 5월 10일(금)까지

납품 주소: 경기도 성남시 분당구 정자동 123-45, ABC전자 물류센터 1층

품목 및 수량:

품목명: 27인치 FHD IPS 모니터 (모델명: BDM-270F)

수량: 100대

또한, 다음 주 화요일(2025년 5월 6일) 오후 2시에 저희 회사 회의실에서 제품 검수 관련 미팅을 진행하고자 합니다. 참석 가능하신지 확인 부탁드립니다.

해당 건에 대한 확인 부탁드리며, 필요하신 경우 발주서 양식 회신 부탁드립니다.
기타 요청사항이나 확인이 필요한 내용이 있다면 언제든지 연락 주시기 바랍니다.

감사합니다.

김현우 과장
ABC전자㈜ 구매팀
hw.kim@alphamail.co.kr
010-1234-5678
`.trim(),
      }
    ],
  });

  console.log("Agent Final Response:", agentResponse);

} catch (e) {
  console.error("Error occurred:", e);
} finally {
  console.log("Closing client...");
  await client.close();
}