package com.alphamail.api.assistants.application.usecase.ai;

import com.alphamail.api.assistants.domain.entity.EmailVector;
import com.alphamail.api.assistants.domain.repository.EmailVectorRepository;
import com.alphamail.api.assistants.infrastructure.dto.EmailVectorResponseDTO;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorRequest;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class EmailVectorUseCase {

    private final EmailVectorRepository emailVectorRepository;

    public  Mono<EmailVectorResponse> execute(EmailVectorRequest request) {

        return emailVectorRepository.registEmailVector(request).map(EmailVectorResponse::from);
    }

}

