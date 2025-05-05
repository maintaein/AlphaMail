package com.alphamail.api.email.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EmailAttachment {
	private Integer id;
	private Integer emailId;
	private String name;
	private String S3Key;
	private Long size;
	private String type;
}
