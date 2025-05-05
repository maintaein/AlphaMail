package com.alphamail.api.email.presentation.dto;

import java.io.InputStream;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttachmentDownloadResponse {
	private InputStream inputStream;
	private String filename;
	private Long size;
	private String contentType;
}
