package com.alphamail.api.email.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.alphamail.api.email.application.usecase.EmailDeliveryUseCase;
import com.alphamail.api.email.domain.entity.EmailStatus;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SESController {

	private final ObjectMapper objectMapper;
	private final EmailDeliveryUseCase emailDeliveryUseCase;
	private final RestTemplate restTemplate = new RestTemplate();

	@PostMapping("/api/ses/webhooks")
	public ResponseEntity<String> handleSnsMessage(@RequestBody String rawPayload) {
		try {
			
			log.info(rawPayload);
			if (rawPayload.contains("Successfully") && rawPayload.contains("subscription")) {
				log.info("SNS 구독 확인 수신됨: {}", rawPayload);
				return ResponseEntity.ok("Subscription confirmation received");
			}

			// JSON 파싱
			JsonNode snsMessage = objectMapper.readTree(rawPayload);
			String messageType = snsMessage.get("Type").asText();

			log.info("SNS 메시지 타입: {}", messageType);

			// 구독 확인 요청 처리
			if ("SubscriptionConfirmation".equals(messageType)) {
				String subscribeUrl = snsMessage.get("SubscribeURL").asText();
				log.info("구독 확인 URL: {}", subscribeUrl);

				// 구독 URL로 GET 요청 보내기
				restTemplate.getForEntity(subscribeUrl, String.class);
				log.info("SNS 구독 확인 요청 완료!");
			}
			// 일반 알림 메시지는 단순히 로깅만 수행
			else if ("Notification".equals(messageType)) {
				log.info("SES 이벤트 알림 수신");

				// 메시지 내용 추출 및 파싱
				String messageContent = snsMessage.get("Message").asText();
				JsonNode sesEvent = objectMapper.readTree(messageContent);

				// 이벤트 타입 확인
				if (sesEvent.has("eventType")) {
					String eventType = sesEvent.get("eventType").asText();
					log.info("SES 이벤트 타입: {}", eventType);

					// 이벤트 타입에 따라 처리
					if ("Delivery".equals(eventType)) {
						// 배송 완료 이벤트 - 메시지 ID 추출 및 업데이트
						processDeliveryEvent(sesEvent);
					}
					else if ("Send".equals(eventType)) {
						// 발송 이벤트 - 상태 업데이트만 수행 (선택적)
						processSendEvent(sesEvent);
					}
				}
			}
			// SNS에는 항상 200 OK로 응답
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("SNS 메시지 처리 오류: {}", e.getMessage(), e);
			// 오류가 발생해도 200 OK로 응답 (SNS가 재시도하지 않도록)
			return ResponseEntity.ok("Error handled");
		}
	}

	private void processSendEvent(JsonNode sesEvent) {
		try {
			// SES 응답 ID 추출
			String sesResponseId = sesEvent.get("mail").get("messageId").asText();
			log.info("발송 이벤트 처리 - SES ID: {}", sesResponseId);

			// 상태 업데이트만 수행 (메시지 ID는 아직 최종버전이 아닐 수 있음)
			// 선택적 - 필요한 경우에만 사용
			// processEmailDeliveryUseCase.updateStatusOnly(sesResponseId, EmailStatus.SENDING);
		} catch (Exception e) {
			log.error("Send 이벤트 처리 중 오류 발생: {}", e.getMessage(), e);
		}
	}

	private void processDeliveryEvent(JsonNode sesEvent) {
		try {
			// SES 응답 ID 추출
			String sesResponseId = sesEvent.get("mail").get("messageId").asText();

			// 이메일 헤더에서 실제 Message-ID 추출
			String actualMessageId = extractMessageIdFromHeaders(sesEvent.get("mail").get("headers"));

			if (actualMessageId != null) {
				log.info("배송 완료 처리 - SES ID: {}, 실제 Message-ID: {}", sesResponseId, actualMessageId);
				// UseCase를 통해 이메일 배송 처리 - SENT 상태로 업데이트
				emailDeliveryUseCase.execute(sesResponseId, actualMessageId, EmailStatus.SENT);
			} else {
				log.warn("Delivery 이벤트: Message-ID 헤더를 찾을 수 없음");
			}
		} catch (Exception e) {
			log.error("Delivery 이벤트 처리 중 오류 발생: {}", e.getMessage(), e);
		}
	}

	private String extractMessageIdFromHeaders(JsonNode headers) {
		if (headers == null) return null;

		for (JsonNode header : headers) {
			if ("Message-ID".equals(header.get("name").asText()) ||
				"Message-Id".equals(header.get("name").asText())) {
				return header.get("value").asText();
			}
		}
		return null;
	}


}