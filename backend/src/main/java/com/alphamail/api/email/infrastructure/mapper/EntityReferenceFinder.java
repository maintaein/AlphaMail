package com.alphamail.api.email.infrastructure.mapper;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import com.alphamail.api.email.infrastructure.entity.EmailFolderEntity;
import com.alphamail.api.email.infrastructure.repository.EmailFolderJpaRepository;
import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.api.user.infrastructure.repository.UserJpaRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EntityReferenceFinder {
	private final EmailFolderJpaRepository folderRepository;
	private final UserJpaRepository userRepository;

	@Named("toFolderEntity")
	public EmailFolderEntity toFolderEntity(Integer folderId) {
		if (folderId == null) {
			throw new IllegalArgumentException("Folder ID cannot be null");
		}
		return folderRepository.findById(folderId)
			.orElseThrow(() -> new RuntimeException("Folder not found with id: " + folderId));
	}

	@Named("toUserEntity")
	public UserEntity toUserEntity(Integer userId) {
		if (userId == null) {
			throw new IllegalArgumentException("User ID cannot be null");
		}
		return userRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
	}
}
