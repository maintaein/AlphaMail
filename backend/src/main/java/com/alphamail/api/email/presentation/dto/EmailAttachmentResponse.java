package com.alphamail.api.email.presentation.dto;

import com.alphamail.api.email.domain.entity.EmailAttachment;

public record EmailAttachmentResponse(
	Integer id,
	String name,
	String path,
	Long size,
	String type
) {
	public static EmailAttachmentResponse from(EmailAttachment attachment) {
		return new EmailAttachmentResponse(
			attachment.getId(),
			attachment.getName(),
			attachment.getS3Key(),
			attachment.getSize(),
			attachment.getType()
		);
	}
}
