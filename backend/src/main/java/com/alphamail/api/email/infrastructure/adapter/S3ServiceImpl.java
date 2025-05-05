package com.alphamail.api.email.infrastructure.adapter;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alphamail.api.email.domain.port.S3Service;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

	private final AmazonS3 s3Client;

	@Value("${aws.s3.bucket-name}")
	private String bucketName;

	@Override
	public InputStream downloadFile(String s3Key) {
		try {
			GetObjectRequest getObjectRequest = new GetObjectRequest(bucketName, s3Key);
			S3Object s3Object = s3Client.getObject(getObjectRequest);
			return s3Object.getObjectContent();
		} catch (AmazonServiceException e) {
			throw new NotFoundException(ErrorMessage.S3AMAZON_NOT_FOUND);
		} catch (Exception e) {
			throw new RuntimeException("S3 파일 다운로드 실패", e);
		}
	}
}