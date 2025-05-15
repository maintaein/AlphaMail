package com.alphamail.api.chatbot.infrastructure.vector;

import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.alphamail.api.chatbot.domain.common.VectorizableDocument;
import com.alphamail.api.schedule.domain.entity.Schedule;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VectorUpsertClient {

	private final RestTemplate restTemplate;

	public void upsert(VectorizableDocument document) {
		Map<String, Object> body = Map.of(
			"id", document.getVectorId(),
			"text", document.toVectorText(),
			"metadata", document.toMetadata()
		);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

		restTemplate.postForEntity("http://localhost:5001/api/vector/upsert", request, Void.class);
	}
}
