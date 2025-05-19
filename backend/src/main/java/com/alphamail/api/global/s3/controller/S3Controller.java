package com.alphamail.api.global.s3.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alphamail.api.erp.presentation.dto.purchaseorder.PurchaseOrderImageResponse;
import com.alphamail.api.global.s3.service.S3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
@Slf4j
public class S3Controller {

	private final S3Service s3Service;

	@PostMapping(value = "/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile image) {
		log.info("[S3 Upload] 이미지 업로드 요청 수신");

		if (image == null || image.isEmpty()) {
			log.warn("[S3 Upload] 이미지 파일이 비어있음");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("이미지 파일이 없습니다.");
		}

		String contentType = image.getContentType();
		log.debug("[S3 Upload] contentType: {}", contentType);

		if (contentType == null ||
			(!contentType.equals("image/jpeg") && !contentType.equals("image/png"))) {
			log.warn("[S3 Upload] 허용되지 않은 이미지 타입: {}", contentType);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("이미지 파일이 PNG 또는 JPEG여야 합니다.");
		}

		try {

			String s3Key = s3Service.uploadFile(image);
			String fullUrl = "https://alphamailemailbucket.s3.ap-northeast-2.amazonaws.com/" + s3Key;

			log.info("[S3 Upload] 업로드 완료: s3Key={}, fullUrl={}", s3Key, fullUrl);
			return ResponseEntity.status(HttpStatus.CREATED)
				.body(new PurchaseOrderImageResponse(fullUrl));
		} catch (Exception e) {
			log.error("[S3 Upload] 이미지 업로드 실패", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Failed to upload image: " + e.getMessage());
		}
	}
}
