package com.alphamail.api.email.domain.port;

import java.io.InputStream;

public interface S3Service {
	InputStream downloadFile(String s3Key);
}
