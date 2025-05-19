package com.alphamail.api.erp.application.usecase;

import java.io.InputStream;
import java.time.Duration;

import org.springframework.stereotype.Service;

import com.alphamail.api.email.domain.entity.EmailOCR;
import com.alphamail.api.email.domain.repository.EmailOCRRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OcrReadUseCase {

	private final EmailOCRRespository emailOCRRespository;
	public EmailOCR execute(InputStream inputStream, String filename, String contentType, String userId) {
		return emailOCRRespository.registOCR(inputStream, filename, contentType, userId)
			.block(Duration.ofSeconds(30)); // 30초 타임아웃 설정
	}
}
