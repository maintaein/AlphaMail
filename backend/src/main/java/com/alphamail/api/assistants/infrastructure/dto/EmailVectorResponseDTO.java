package com.alphamail.api.assistants.infrastructure.dto;

public record EmailVectorResponseDTO(
        String status,
        String thread_id,
        String message
) {
}
