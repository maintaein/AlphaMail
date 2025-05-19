package com.alphamail.api.global.s3.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
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


	@PostMapping(value = "/documents", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file) {
		log.info("[S3 Upload] 문서 파일 업로드 요청 수신");

		if (file == null || file.isEmpty()) {
			log.warn("[S3 Upload] 파일이 비어있음");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("업로드할 파일이 없습니다.");
		}

		// 파일 확장자 및 컨텐츠 타입 검증
		String contentType = file.getContentType();
		String originalFilename = file.getOriginalFilename();
		String fileExtension = StringUtils.getFilenameExtension(originalFilename);

		log.debug("[S3 Upload] contentType: {}, fileName: {}, extension: {}",
			contentType, originalFilename, fileExtension);

		// 허용된 파일 형식 확인
		boolean isValidImageType = contentType != null && (
			contentType.equals("image/jpeg") ||
				contentType.equals("image/png") ||
				contentType.equals("image/jpg")
		);

		boolean isValidPdfType = contentType != null && contentType.equals("application/pdf");

		if (!isValidImageType && !isValidPdfType) {
			log.warn("[S3 Upload] 허용되지 않은 파일 타입: {}", contentType);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("파일은 PDF, PNG 또는 JPEG(JPG) 형식이어야 합니다.");
		}

		// 파일 확장자 추가 검증
		if (fileExtension != null) {
			fileExtension = fileExtension.toLowerCase();
			boolean isValidExtension = fileExtension.equals("pdf") ||
				fileExtension.equals("png") ||
				fileExtension.equals("jpg") ||
				fileExtension.equals("jpeg");

			if (!isValidExtension) {
				log.warn("[S3 Upload] 허용되지 않은 파일 확장자: {}", fileExtension);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("파일 확장자는 .pdf, .png, .jpg 또는 .jpeg여야 합니다.");
			}
		}

		try {
			// 기존 서비스 메서드 사용
			String s3Key = s3Service.uploadFile(file);
			String fileUrl = "https://alphamailemailbucket.s3.ap-northeast-2.amazonaws.com/" + s3Key;

			log.info("[S3 Upload] 업로드 완료: fileType={}, url={}", contentType, fileUrl);

			S3UploadUrl response = S3UploadUrl.builder()
				.s3Key(fileUrl)
				.build();

			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			log.error("[S3 Upload] 파일 업로드 실패", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("파일 업로드에 실패했습니다: " + e.getMessage());
		}
	}

}
