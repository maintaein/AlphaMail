package com.alphamail.api.email.presentation.dto;

public record AttachmentRequest(
	String filename,
	String contentType,
	Long size,
	String s3Key
) {
}
