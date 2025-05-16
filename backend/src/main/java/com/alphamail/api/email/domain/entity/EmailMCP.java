package com.alphamail.api.email.domain.entity;

import com.alphamail.api.email.infrastructure.dto.EmailMCPResponseDTO;

import java.util.List;
import java.util.Map;

public record EmailMCP(
        Map<String, Object> response,
        List<Map<String, Object>> tool_calls,
        String error
) {

    public static EmailMCP from(EmailMCPResponseDTO emailMCPResponseDTO) {
        return new EmailMCP(emailMCPResponseDTO.response(), emailMCPResponseDTO.tool_calls(), emailMCPResponseDTO.error());

    }
}
