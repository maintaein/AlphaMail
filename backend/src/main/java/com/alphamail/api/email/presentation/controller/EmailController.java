package com.alphamail.api.email.presentation.controller;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.email.application.service.EmailService;
import com.alphamail.api.email.application.usecase.GetEmailUseCase;
import com.alphamail.api.email.presentation.dto.EmailListResponse;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {

	private final EmailService emailService;
	private final GetEmailUseCase getEmailUseCase;

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

		EmailListResponse emails = getEmailUseCase.execute(folderId, userId, query, sort, pageable);


		return ResponseEntity.ok(emails);

	}

}
