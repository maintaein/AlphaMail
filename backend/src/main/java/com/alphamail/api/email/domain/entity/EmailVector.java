package com.alphamail.api.email.domain.entity;

import com.alphamail.api.email.infrastructure.dto.EmailVectorResponseDTO;

public record EmailVector (
        String status,
        String threadId,
        String message
) {

    public static EmailVector from(EmailVectorResponseDTO emailVectorResponseDTO) {
        return new EmailVector(emailVectorResponseDTO.status(), emailVectorResponseDTO.thread_id(), emailVectorResponseDTO.message());
    }


}