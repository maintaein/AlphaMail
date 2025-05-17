package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;
import java.util.List;

public record VectorDBRequest(
        String from,
        List<String> to,
        LocalDateTime date,
        String html,
        String subject
) {

    public static VectorDBRequest fromReceiveEmailRequest(ReceiveEmailRequest receiveEmailRequest) {
        return new VectorDBRequest(
                receiveEmailRequest.from(),
                receiveEmailRequest.to(),
                receiveEmailRequest.date(),
                receiveEmailRequest.html(),
                receiveEmailRequest.subject()
        );
    }
    public static VectorDBRequest fromSendEmailRequest(SendEmailRequest sendEmailRequest) {
        return new VectorDBRequest(
          sendEmailRequest.sender(),
          sendEmailRequest.recipients(),
          LocalDateTime.now(),
          sendEmailRequest.bodyHtml(),
          sendEmailRequest.subject()
        );
    }
}
