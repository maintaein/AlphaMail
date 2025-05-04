package com.alphamail.api.email.presentation.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import com.alphamail.api.email.application.usecase.GetEmailDetailUseCase;
import com.alphamail.api.email.application.usecase.GetEmailListUseCase;
import com.alphamail.api.email.application.usecase.GetFolderUseCase;
import com.alphamail.api.email.presentation.dto.DeleteMailsRequest;
import com.alphamail.api.email.presentation.dto.EmailDetailResponse;
import com.alphamail.api.email.presentation.dto.EmailListResponse;
import com.alphamail.api.email.presentation.dto.FolderResponse;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

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

	@PostMapping
	public ResponseEntity<Void> sendEmail(@RequestBody SendEmailRequest emailRequest, @AuthenticationPrincipal
	UserDetails userDetails) {

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
