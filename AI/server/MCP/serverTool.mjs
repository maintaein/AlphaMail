import { FastMCP } from "fastmcp";
import { z } from "zod";
import fetch from "node-fetch";

const server = new FastMCP({
  name: "My Server",
  version: "1.0.0",
});

const parseJsonString = (val) => {
  if (typeof val !== 'string') return val;
  try {
    const cleanedString = val.replace(/\\"/g, '"').replace(/^"|"$/g, '');
    return JSON.parse(cleanedString);
  } catch (e1) {
    try {
      const fixed = val.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/^"|"$/g, '');
      return JSON.parse(fixed);
    } catch (e2) {
      return [];
    }
  }
};

const itemSchema = z.object({
  name: z.string(),
  quantity: z.preprocess((val) => {
    if (typeof val === 'string') return parseInt(val.replace(/[^\d]/g, ''), 10);
    return val;
  }, z.number().int())
});

server.addTool({
  name: "date",
  description: "요일, 날짜 등 관련 일정 정보를 추출합니다.",
  parameters: z.object({
    title: z.string().optional(),
    start: z.string(),
    end: z.string(),
    description: z.string().optional(),
  }),
  execute: async (args) => {
    return {
      message: `일정이 추가되었습니다.`,
      data: args,
    };
  },
});

server.addTool({
  name: "orderRequest",
  description: "발주 요청 이메일을 분석하여 거래처 정보 및 품목 정보를 추출합니다.",
  parameters: z.object({
    company: z.string(),
    contactName: z.string(),
    contactEmail: z.string(),
    paymentTerms: z.string(),
    deliveryAddress: z.string(),
    deliveryDate: z.string(),
    items: z.preprocess(parseJsonString, z.array(itemSchema))
  }),
  execute: async (args) => {
    try {
      // 외부 API로 POST 요청 예시
      const response = await fetch("https://your-api-endpoint.com/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      const result = await response.json();
      return {
        message: `발주 정보가 정상적으로 외부 시스템에 전송되었습니다.`,
        apiResult: result, // 외부 API 응답도 함께 반환
        data: args,
      };
    } catch (error) {
      return {
        message: "외부 시스템 전송 중 오류가 발생했습니다.",
        error: error.message,
        data: args,
      };
    }
  },
});

server.addTool({
  name: "estimateRequest",
  description: "견적 요청 이메일을 분석하여 거래처 정보와 요청 품목 정보를 추출합니다.",
  parameters: z.object({
    company: z.string().optional(),
    deliveryAddress: z.string().optional(),
    items: z.preprocess(parseJsonString, z.array(itemSchema))
  }),
  execute: async (args) => {
    return {
      message: `견적 정보가 정상적으로 수신되었습니다.`,
      data: args,
    };
  },
});

server.start({
  transportType: "sse",
  sse: {
    endpoint: "/sse",
    port: 8000,
  },
});