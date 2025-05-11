package com.alphamail.api.assistants.domain.entity;


public record VectorDB(
        String threadId,
        String userId,
        String emailContent
) {
}
