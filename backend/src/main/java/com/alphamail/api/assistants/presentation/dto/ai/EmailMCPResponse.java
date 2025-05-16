package com.alphamail.api.assistants.presentation.dto.ai;

import com.alphamail.api.email.domain.entity.EmailMCP;

import java.util.List;
import java.util.Map;

public record EmailMCPResponse(
        Map<String, Object> response,
        List<Map<String, Object>> tool_calls,
        String error
) {

    public static EmailMCPResponse from(EmailMCP emailMCP) {
        return new EmailMCPResponse(emailMCP.response(), emailMCP.tool_calls(), emailMCP.error());
    }
}
