package com.alphamail.api.email.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SESController {

	private final ObjectMapper objectMapper = new ObjectMapper();

	@PostMapping("/api/ses/webhooks")
	public ResponseEntity<String> handleSnsMessage(@RequestBody String rawPayload) {
		try {
			// JSON 파싱
			JsonNode snsMessage = objectMapper.readTree(rawPayload);
			String messageType = snsMessage.get("Type").asText();

			System.out.println("SNS 메시지 타입: " + messageType);

			// 구독 확인 요청 처리
			if ("SubscriptionConfirmation".equals(messageType)) {
				String subscribeUrl = snsMessage.get("SubscribeURL").asText();
				System.out.println("구독 확인 URL: " + subscribeUrl);

				// 구독 URL로 GET 요청 보내기
				RestTemplate restTemplate = new RestTemplate();
				restTemplate.getForEntity(subscribeUrl, String.class);
				System.out.println("SNS 구독 확인 요청 완료!");
			}
			// 일반 알림 메시지는 단순히 로깅만 수행
			else if ("Notification".equals(messageType)) {
				System.out.println("SES 이벤트 알림 수신: " + snsMessage);
			}

			// SNS에는 항상 200 OK로 응답
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			System.err.println("SNS 메시지 처리 오류: " + e.getMessage());
			// 오류가 발생해도 200 OK로 응답 (SNS가 재시도하지 않도록)
			return ResponseEntity.ok("Error handled");
		}
	}
}