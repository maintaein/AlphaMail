package com.alphamail.api.user.domain;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCrypt;

import com.alphamail.api.user.domain.valueobject.UserId;
import com.alphamail.api.user.presentation.dto.SignUpRequest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User {
	private UserId id;
	private Integer groupId;
	private String position;
	private String name;
	private String email;
	private String phoneNumber;
	private String hashedPassword;
	private String imageUrl;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;

	public static User create(SignUpRequest signUpRequest) {
		return User.builder()
			.groupId(signUpRequest.groupId())
			.position(signUpRequest.position())
			.name(signUpRequest.name())
			.email(signUpRequest.email())
			.phoneNumber(signUpRequest.phoneNumber())
			.hashedPassword(hashPassword(signUpRequest.password()))
			.imageUrl(signUpRequest.imageUrl())
			.build();
	}

	private static String hashPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt(12)); // 12는 반복 횟수
	}

	public boolean verifyPassword(String plainPassword) {
		return BCrypt.checkpw(plainPassword, hashedPassword);
	}
}
