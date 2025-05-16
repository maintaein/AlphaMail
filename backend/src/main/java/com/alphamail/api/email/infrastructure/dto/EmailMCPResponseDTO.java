package com.alphamail.api.email.infrastructure.dto;

import java.util.List;
import java.util.Map;

public record EmailMCPResponseDTO(
        Map<String, Object> response,
        List<Map<String, Object>> tool_calls,
        String error
) {
}
