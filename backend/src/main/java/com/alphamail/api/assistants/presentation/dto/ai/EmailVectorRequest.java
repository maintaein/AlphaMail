package com.alphamail.api.assistants.presentation.dto.ai;

public record EmailVectorRequest(
        String emailContent,
        String threadId,
        String userId
) {

}
