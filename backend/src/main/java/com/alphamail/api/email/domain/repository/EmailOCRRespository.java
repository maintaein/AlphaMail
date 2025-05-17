package com.alphamail.api.email.domain.repository;

import com.alphamail.api.email.domain.entity.EmailOCR;
import reactor.core.publisher.Mono;

import java.io.InputStream;

public interface EmailOCRRespository {

    Mono<EmailOCR> registOCR(InputStream inputStream, String filename, String contentType, String userId);
}
