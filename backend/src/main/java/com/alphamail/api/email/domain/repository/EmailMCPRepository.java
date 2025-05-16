package com.alphamail.api.email.domain.repository;

import com.alphamail.api.email.domain.entity.EmailMCP;
import com.alphamail.api.assistants.presentation.dto.ai.EmailMCPRequest;
import reactor.core.publisher.Mono;

public interface EmailMCPRepository {

    Mono<EmailMCP> registMCP(String query);
}
