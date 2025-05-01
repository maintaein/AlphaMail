// server.remote.mjs
import { FastMCP } from "fastmcp";
import { z } from "zod"; 

const server = new FastMCP({
  name: "My Server",
  version: "1.0.0",
});

// 문자열을 자동으로 파싱하는 유틸리티 함수
const parseJsonString = (val) => {
  // 이미 객체인 경우 그대로 반환
  if (typeof val !== 'string') return val;
  
  try {
    // 따옴표 이스케이프 처리를 위한 정규식 변환
    const cleanedString = val
      .replace(/\\"/g, '"')  // 이스케이프된 따옴표 처리
      .replace(/^"|"$/g, ''); // 앞뒤 따옴표 제거 (필요시)
    
    return JSON.parse(cleanedString);
  } catch (e) {
    console.error("JSON 파싱 실패 (첫번째 시도):", e);
    
    try {
      // 백슬래시가 두 번 이스케이프된 경우 처리 (\\\\)
      const doubleEscaped = val
        .replace(/\\\\/g, '\\')
        .replace(/\\"/g, '"')
        .replace(/^"|"$/g, '');
      
      return JSON.parse(doubleEscaped);
    } catch (e2) {
      console.error("JSON 파싱 실패 (두번째 시도):", e2);
      
      // 마지막 시도 - 배열 형태의 문자열인지 확인
      if (val.includes('[') && val.includes(']')) {
        try {
          // 문자열에서 배열 부분만 추출하여 파싱
          const arrayMatch = val.match(/\[(.*)\]/s);
          if (arrayMatch && arrayMatch[0]) {
            return JSON.parse(arrayMatch[0]);
          }
        } catch (e3) {
          console.error("JSON 배열 파싱 실패:", e3);
        }
      }
      
      // 파싱 실패시 빈 배열 반환
      return [];
    }
  }
};

server.addTool({
  name: "calendar",
  description: "메일을 분석하여 일정 및 미팅 정보를 추출합니다.",
  parameters: z.object({
    title: z.string(),
    start: z.string(),  // ISO8601 포맷 추천: "2025-04-30T14:00:00"
    end: z.string(),
    description: z.string().optional(),
  }),
  
  execute: async (args) => {
    console.log("추출된 일정", args);
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
    company: z.string(),                    // 거래처명
    contactName: z.string(),               // 거래처 담당자 (보낸사람)
    contactEmail: z.string(),              // 거래처 연락처 (보낸사람 이메일)
    paymentTerms: z.string(),              // 결제 조건
    deliveryAddress: z.string(),           // 주소
    deliveryDate: z.string(),              // 납기일자
    items: z.preprocess(
      parseJsonString,
      z.array(
        z.object({
          name: z.string(),
          quantity: z.preprocess(
            (val) => typeof val === "string" ? parseInt(val, 10) : val,
            z.number().int().or(z.string())  // 문자열도 허용하도록 수정
          )
        })
      ).or(z.string())  // items가 문자열인 경우도 허용
    )
  }),
  execute: async (args) => {
    console.log("원본 발주 정보:", args);
    
    // items 처리 - 배열인지 확인
    let processedItems = [];
    
    if (typeof args.items === 'string') {
      try {
        // 문자열로 들어온 경우 다시 파싱 시도
        processedItems = parseJsonString(args.items);
        console.log("문자열에서 파싱한 items:", processedItems);
      } catch (e) {
        console.error("items 문자열 파싱 실패:", e);
      }
    } else if (Array.isArray(args.items)) {
      processedItems = args.items;
    }
    
    // quantity를 숫자로 변환
    try {
      processedItems = processedItems.map(item => ({
        name: item.name,
        quantity: typeof item.quantity === "string" ? parseInt(item.quantity, 10) : item.quantity
      }));
    } catch (e) {
      console.error("아이템 변환 실패:", e);
    }
  

    return {
      message: `발주 정보가 정상적으로 수신되었습니다.`,
      data: args,  // <== 전달된 args 포함
    };
  },
});

server.addTool({
  name: "estimateRequest",
  description: "견적 요청 이메일을 분석하여 거래처 정보와 요청 품목 정보를 추출합니다.",
  parameters: z.object({
    company: z.string(),                     // 거래처명
    deliveryAddress: z.string(),            // 납품 주소
    items: z.preprocess(
      parseJsonString,
      z.array(
        z.object({
          name: z.string(),
          quantity: z.preprocess(
            (val) => typeof val === "string" ? parseInt(val, 10) : val,
            z.number().int().or(z.string())  // 문자열도 허용하도록 수정
          )
        })
      ).or(z.string())  // items가 문자열인 경우도 허용
    )
  }),
  execute: async (args) => {
    console.log("📄 원본 견적 요청 정보:", args);
    
    // items 처리 - 배열인지 확인
    let processedItems = [];
    
    if (typeof args.items === 'string') {
      try {
        // 문자열로 들어온 경우 다시 파싱 시도
        processedItems = parseJsonString(args.items);
        console.log("📄 문자열에서 파싱한 items:", processedItems);
      } catch (e) {
        console.error("items 문자열 파싱 실패:", e);
      }
    } else if (Array.isArray(args.items)) {
      processedItems = args.items;
    }
    
    // quantity를 숫자로 변환
    try {
      processedItems = processedItems.map(item => ({
        name: item.name,
        quantity: typeof item.quantity === "string" ? parseInt(item.quantity, 10) : item.quantity
      }));
    } catch (e) {
      console.error("아이템 변환 실패:", e);
    }
    
    return {
      message: `견적적 정보가 정상적으로 수신되었습니다.`,
      data: args,  // <== 전달된 args 포함
    };
  },
});

server.start({
  transportType: "sse",
  sse: {
    endpoint: "/sse",
    port: 8080,
  },
});