package com.alphamail.api.user.presentation.controller;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.user.application.usecase.ChangePasswordUseCase;
import com.alphamail.api.user.application.usecase.GetUserInfoUseCase;
import com.alphamail.api.user.application.usecase.RegistUserUseCase;
import com.alphamail.api.user.application.usecase.VerifyPasswordUseCase;
import com.alphamail.api.user.presentation.dto.ChangePasswordRequest;
import com.alphamail.api.user.presentation.dto.CreateUserRequest;
import com.alphamail.api.user.presentation.dto.PasswordChangeResult;
import com.alphamail.api.user.presentation.dto.UserInfoResponse;
import com.alphamail.common.annotation.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

	private final RegistUserUseCase registUserUseCase;
	private final ChangePasswordUseCase changePasswordUseCase;
	private final GetUserInfoUseCase getUserInfoUseCase;
	private final VerifyPasswordUseCase verifyPasswordUseCase;

	@PostMapping
	public ResponseEntity<Boolean> regist(@RequestBody CreateUserRequest request) {
		return ResponseEntity.ok(registUserUseCase.execute(request));
	}

	@GetMapping("/my")
	public ResponseEntity<UserInfoResponse> getUserInfo(@Auth Integer userId) {
		UserInfoResponse response = getUserInfoUseCase.execute(userId);

		return ResponseEntity.ok(response);
	}

	@PatchMapping("/password")
	public ResponseEntity<?> update(@Auth Integer userId, @RequestBody ChangePasswordRequest request) {
		PasswordChangeResult result = changePasswordUseCase.execute(userId, request);

		if (result.success()) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.badRequest().body(result);
		}

	}

	@PostMapping("/verify-password")
	public ResponseEntity<?> verifyPassword(@Auth Integer userId, @RequestBody ChangePasswordRequest request) {
		PasswordChangeResult result = verifyPasswordUseCase.execute(userId, request.currPassword());

		if (result.success()) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.badRequest().body(result);
		}

	}

}
