package com.alphamail.api.email.infrastructure.repository.ai;

import com.alphamail.api.email.domain.entity.EmailOCR;
import com.alphamail.api.email.domain.repository.EmailOCRRespository;
import com.alphamail.api.email.infrastructure.dto.EmailOCRResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.io.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
@Slf4j
@Repository
public class EmailOCRRepositoryImpl implements EmailOCRRespository {

    private final WebClient ocrWebClient;

    @Autowired
    public EmailOCRRepositoryImpl(@Qualifier("ocrWebClient") WebClient ocrWebClient) {
        this.ocrWebClient = ocrWebClient;
    }

    @Override
    public Mono<EmailOCR> registOCR(InputStream inputStream, String originalFileName, String contentType, String userId) {

            return ocrWebClient.post()
                    .uri("/ocr")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData(buildMultipartBody(inputStream, contentType, originalFileName, userId)))
                    .retrieve()
                    .bodyToMono(EmailOCRResponseDTO.class)
                    .map(EmailOCR::from);

    }

    private MultiValueMap<String, HttpEntity<?>> buildMultipartBody(InputStream inputStream, String contentType, String fileName, String userId) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        try {
            String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
            builder.part("file", new InputStreamResource(inputStream))
                    .header("Content-Disposition", "form-data; name=\"file\"; filename*=UTF-8''" + encodedFileName)
                    .contentType(resolveMediaType(contentType));
            builder.part("userId", userId);
        } catch (Exception e) {
            throw new RuntimeException("파일명 인코딩 실패", e);
        }
        return builder.build();
    }

    private MediaType resolveMediaType(String contentType) {
        if (contentType.endsWith("png")) return MediaType.IMAGE_PNG;
        if (contentType.endsWith("jpg") || contentType.endsWith("jpeg")) return MediaType.IMAGE_JPEG;
        if (contentType.endsWith("pdf")) return MediaType.APPLICATION_PDF;
        return MediaType.APPLICATION_OCTET_STREAM;
    }

}