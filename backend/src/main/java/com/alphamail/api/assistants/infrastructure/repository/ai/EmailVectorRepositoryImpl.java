package com.alphamail.api.assistants.infrastructure.repository.ai;

import com.alphamail.api.assistants.domain.entity.EmailVector;
import com.alphamail.api.assistants.domain.repository.EmailVectorRepository;
import com.alphamail.api.assistants.infrastructure.dto.EmailVectorResponseDTO;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Repository
public class EmailVectorRepositoryImpl implements EmailVectorRepository {

    private final WebClient ragWebClient;

    @Autowired
    public EmailVectorRepositoryImpl(@Qualifier("ragWebClient")WebClient ragWebClient) {
        this.ragWebClient = ragWebClient;
    }

    @Override
    public Mono<EmailVector> registEmailVector(EmailVectorRequest request) {
        return ragWebClient.post()
                .uri("/sendmail")
                .body(BodyInserters
                        .fromFormData("email_content", request.emailContent())
                        .with("thread_id", request.threadId())
                        .with("user_id", request.userId()))
                .retrieve()
                .bodyToMono(EmailVectorResponseDTO.class)
                .map(EmailVector::from);
    }
}
