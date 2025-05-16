package com.alphamail.api.email.domain.repository;

import com.alphamail.api.email.domain.entity.EmailVector;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorRequest;
import reactor.core.publisher.Mono;

public interface EmailVectorRepository {

    Mono<EmailVector> registEmailVector(String query, Integer userId, String threadId);


}
