package com.alphamail.api.assistants.presentation.dto.ai;

import com.alphamail.api.email.domain.entity.EmailVector;

public record EmailVectorResponse(
        String status,
        String threadId,
        String message
) {

    public static EmailVectorResponse from(EmailVector emailVector) {
        return new EmailVectorResponse(emailVector.status(), emailVector.threadId(), emailVector.message());
    }

}