package com.alphamail.api.email.infrastructure.repository.ai;

import com.alphamail.api.email.domain.entity.EmailMCP;
import com.alphamail.api.email.domain.repository.EmailMCPRepository;
import com.alphamail.api.email.infrastructure.dto.EmailMCPResponseDTO;
import com.alphamail.api.assistants.presentation.dto.ai.EmailMCPRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Repository
public class EmailMCPRepositoryImpl implements EmailMCPRepository {

    private final WebClient mcpWebClient;

    @Autowired
    public EmailMCPRepositoryImpl(@Qualifier("mcpWebClient") WebClient ragWebClient) {
        this.mcpWebClient = ragWebClient;
    }

    public Mono<EmailMCP> registMCP(String query) {
        Map<String, String> payload = Map.of("query", query);

        return mcpWebClient.post()
                .uri("/query")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(payload))
                .retrieve()
                .bodyToMono(EmailMCPResponseDTO.class)
                .map(EmailMCP::from);
    }
}
