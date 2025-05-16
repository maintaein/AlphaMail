package com.alphamail.api.user.application.usecase;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.auth.domain.repository.TokenRepository;
import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.repository.UserRepository;
import com.alphamail.api.user.presentation.dto.PasswordChangeResult;
import com.alphamail.common.exception.ErrorMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VerifyPasswordUseCase {

	private final UserRepository userRepository;
	private final TokenRepository tokenRepository;

	public PasswordChangeResult execute(Integer userId, String password) {
		User user = userRepository.findById(userId);

		if (!user.verifyPassword(password)) {
			return PasswordChangeResult.failure(ErrorMessage.CURRENT_PASSWORD_MISMATCH);
		}

		// todo: 5분짜리 임시 토큰 발급이 필요합니다.

		return PasswordChangeResult.SUCCESS;
	}
}
