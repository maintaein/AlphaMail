package com.alphamail.api.assistants.domain.entity;

import com.alphamail.api.assistants.infrastructure.dto.EmailVectorResponseDTO;

public record EmailVector (
        String status,
        String threadId,
        String message
) {

    public static EmailVector from(EmailVectorResponseDTO emailVectorResponseDTO) {
        return new EmailVector(emailVectorResponseDTO.status(), emailVectorResponseDTO.thread_id(), emailVectorResponseDTO.message());
    }


}