package com.alphamail.api.user.domain.entity;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCrypt;

import com.alphamail.api.user.domain.valueobject.UserId;
import com.alphamail.api.user.presentation.dto.RegistRequest;

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

	public static User create(RegistRequest registRequest) {
		return User.builder()
			.groupId(registRequest.groupId())
			.position(registRequest.position())
			.name(registRequest.name())
			.email(registRequest.email())
			.phoneNumber(registRequest.phoneNumber())
			.hashedPassword(hashPassword(registRequest.password()))
			.imageUrl(registRequest.imageUrl())
			.build();
	}

	private static String hashPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt(12)); // 12는 반복 횟수
	}

	public boolean verifyPassword(String plainPassword) {
		return BCrypt.checkpw(plainPassword, hashedPassword);
	}
}
