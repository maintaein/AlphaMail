package com.alphamail.api.email.presentation.controller;

import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.email.application.service.EmailService;
import com.alphamail.api.email.application.usecase.DeleteMailsUseCase;
import com.alphamail.api.email.application.usecase.DownloadAttachmentUseCase;
import com.alphamail.api.email.application.usecase.GetEmailDetailUseCase;
import com.alphamail.api.email.application.usecase.GetEmailListUseCase;
import com.alphamail.api.email.application.usecase.GetFolderUseCase;
import com.alphamail.api.email.application.usecase.ReceiveEmailUseCase;
import com.alphamail.api.email.presentation.dto.AttachmentDownloadResponse;
import com.alphamail.api.email.presentation.dto.DeleteMailsRequest;
import com.alphamail.api.email.presentation.dto.EmailDetailResponse;
import com.alphamail.api.email.presentation.dto.EmailListResponse;
import com.alphamail.api.email.presentation.dto.FolderResponse;
import com.alphamail.api.email.presentation.dto.ReceiveEmailRequest;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;
import com.alphamail.api.user.domain.valueobject.UserId;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/mails")
@RequiredArgsConstructor
public class EmailController {

	private final EmailService emailService;
	private final GetEmailListUseCase getEmailListUseCase;
	private final GetFolderUseCase getFolderUseCase;
	private final GetEmailDetailUseCase getEmailDetailUseCase;
	private final DeleteMailsUseCase deleteMailsUseCase;
	private final ReceiveEmailUseCase receiveEmailUseCase;
	private final DownloadAttachmentUseCase downloadAttachmentUseCase;

	// 실제 사용자가 첨부파일을 DownLoad하는 API
	@GetMapping("/api/emails/{emailId}/attachments/{attachmentId}")
	public ResponseEntity<Resource> downloadAttachment(
		@PathVariable Integer emailId,
		@PathVariable Integer attachmentId,
		@AuthenticationPrincipal UserDetails userDetails) {

		//일단 임시로 UserId = 1로 저장
		//todo: UserDetails에 대한 설명을 듣고 UserId를 어떻게 처리할지 고민을 해야한다.
		UserId userId = new UserId(1);

		AttachmentDownloadResponse response = downloadAttachmentUseCase.execute(
			emailId, attachmentId, userId
		);

		InputStreamResource resource = new InputStreamResource(response.getInputStream());

		return ResponseEntity.ok()
			.contentType(MediaType.parseMediaType(response.getContentType()))
			.contentLength(response.getSize())
			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + response.getFilename() + "\"")
			.body(resource);
	}

	//SES에서 Lambda를 통해 Springboot로 Email 수신하는 API
	@PostMapping("/ses")
	public ResponseEntity<Void> receiveEmail(@RequestBody ReceiveEmailRequest receiveEmailRequest) {
		receiveEmailUseCase.excute(receiveEmailRequest);
		return ResponseEntity.ok().build();
	}

	@PostMapping
	public ResponseEntity<Void> sendEmail(@RequestBody SendEmailRequest emailRequest,
		@AuthenticationPrincipal UserDetails userDetails) {

		//test용 임의 유저아이디
		Integer userId = 1;

		emailService.sendEmail(emailRequest, userId);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<EmailListResponse> getAllEmails(@RequestParam Integer folderId,
		@RequestParam(required = false) String query,
		@RequestParam(required = false, defaultValue = "desc") String sort,
		@PageableDefault(page = 0, size = 20) Pageable pageable,
		@AuthenticationPrincipal UserDetails userDetails) {

		// Integer userId = ((CustomUserDetails) userDetails).getId();

		//test용 임의 유저아이디
		Integer userId = 1;

		EmailListResponse emails = getEmailListUseCase.execute(folderId, userId, query, sort, pageable);

		return ResponseEntity.ok(emails);

	}

	@GetMapping("/folders")
	public ResponseEntity<List<FolderResponse>> getUserFolders(@AuthenticationPrincipal UserDetails userDetails) {
		Integer userId = 1;

		List<FolderResponse> folders = getFolderUseCase.execute(userId);

		return ResponseEntity.ok(folders);

	}

	@GetMapping("/{mailId}")
	public ResponseEntity<EmailDetailResponse> getEmail(@PathVariable Integer mailId,
		@AuthenticationPrincipal UserDetails userDetails) {
		//임시용
		Integer userId = 1;
		EmailDetailResponse emailDetail = getEmailDetailUseCase.execute(mailId, userId);

		return ResponseEntity.ok(emailDetail);
	}

	@PatchMapping("/trash")
	public ResponseEntity<Void> moveMailsToTrash(@RequestBody DeleteMailsRequest request,
		@AuthenticationPrincipal UserDetails userDetails) {

		//임시용
		Integer userId = 1;

		deleteMailsUseCase.execute(request, userId);
		return ResponseEntity.ok().build();

	}

}
