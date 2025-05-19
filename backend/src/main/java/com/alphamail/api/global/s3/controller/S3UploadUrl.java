package com.alphamail.api.global.s3.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class S3UploadUrl {
	String s3Key;
}
