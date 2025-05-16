package com.alphamail.api.email.infrastructure.dto;

public record EmailVectorResponseDTO(
        String status,
        String thread_id,
        String message
) {
}
