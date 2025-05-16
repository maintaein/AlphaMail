package com.alphamail.api.chatbot.infrastructure.claude;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.alphamail.common.exception.BadRequestException;
import com.alphamail.common.exception.ErrorMessage;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClaudeApiClient {

	private final RestTemplate restTemplate;
	private final ObjectMapper objectMapper;

	@Value("${claude.api.key}")
	private String apiKey;
	@Value("${claude.base-url}")
	private String baseUrl;

	public String askClaude(String userMessage) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("x-api-key", apiKey);
			headers.set("anthropic-version", "2023-06-01");

			Map<String, Object> request = new HashMap<>();
			request.put("model", "claude-3-5-sonnet-20241022");
			request.put("max_tokens", 1000);
			request.put("temperature", 0.7);
			request.put("messages", List.of(
				Map.of("role", "user", "content", userMessage)
			));

			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

			ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, entity, String.class);

			JsonNode root = objectMapper.readTree(response.getBody());
			return root.get("content").get(0).get("text").asText();
		} catch (Exception e) {
			e.printStackTrace();
			return "Claude 응답실패: " + e.getMessage();
		}
	}

	// 시스템 프롬프트를 지원하는 새로운 메서드 추가
	// 모델 조금은 멍청한 모델로 사용함 -> 멍청해도 template 정도는 만들 수 있음
	public String askClaudeWithSystemPrompt(String systemPrompt, String userPrompt) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("x-api-key", apiKey);
			headers.set("anthropic-version", "2023-06-01");

			Map<String, Object> request = new HashMap<>();
			request.put("model", "claude-3-haiku-20240307");
			request.put("max_tokens", 1000);
			request.put("temperature", 0.7);
			request.put("system", systemPrompt);

			// System 프롬프트와 User 프롬프트를 분리하여 전송
			request.put("messages", List.of(
				Map.of("role", "user", "content", userPrompt)
			));

			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

			long start = System.currentTimeMillis();

			ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, entity, String.class);

			long elapsed = System.currentTimeMillis() - start;
			log.info("Claude 응답 시간: {} ms", elapsed);

			JsonNode root = objectMapper.readTree(response.getBody());
			return root.get("content").get(0).get("text").asText();
		} catch (Exception e) {
			throw new BadRequestException(ErrorMessage.CLAUDE_API_ERROR); // ✅ 이걸로 충분함
		}
	}
}
