package com.alphamail.api.email.infrastructure.repository.ai;

import com.alphamail.api.email.domain.entity.EmailVector;
import com.alphamail.api.email.domain.repository.EmailVectorRepository;
import com.alphamail.api.email.infrastructure.dto.EmailVectorResponseDTO;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
    public Mono<EmailVector> registEmailVector(String query, Integer userId, String threadId) {
        return ragWebClient.post()
                .uri("/sendmail")
                .body(BodyInserters
                        .fromFormData("email_content", query)
                        .with("thread_id", threadId)
                        .with("user_id", String.valueOf(userId)))
                .retrieve()
                .bodyToMono(EmailVectorResponseDTO.class)
                .map(EmailVector::from);
    }
}
