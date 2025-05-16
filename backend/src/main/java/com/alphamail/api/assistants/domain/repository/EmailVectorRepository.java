package com.alphamail.api.assistants.domain.repository;

import com.alphamail.api.assistants.domain.entity.EmailVector;
import com.alphamail.api.assistants.infrastructure.dto.EmailVectorResponseDTO;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorRequest;
import reactor.core.publisher.Mono;

public interface EmailVectorRepository {

    Mono<EmailVector> registEmailVector(EmailVectorRequest request);


}
