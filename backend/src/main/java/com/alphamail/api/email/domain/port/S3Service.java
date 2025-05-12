package com.alphamail.api.email.domain.port;

import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
	InputStream downloadFile(String s3Key);

	String uploadFile(MultipartFile file);

	List<String> uploadFiles(List<MultipartFile> files);
}
