package com.alphamail.api.email.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.email.application.service.EmailService;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {

	private final EmailService emailService;

	@PostMapping
	public ResponseEntity<Void> sendEmail(@RequestBody SendEmailRequest emailRequest, @AuthenticationPrincipal
		UserDetails userDetails) {

		//test용 임의 유저아이디
		Integer userId = 1;

		emailService.sendEmail(emailRequest, userId);
		return ResponseEntity.ok().build();
	}
}
