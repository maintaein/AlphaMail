package com.alphamail.api.email.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.infrastructure.entity.EmailFolderEntity;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailFolderRepositoryImpl implements EmailFolderRepository {

	private final EmailFolderJpaRepository emailFolderJpaRepository;

	@Override
	public Integer getSentFolderId(Integer userId) {
		EmailFolderEntity folderEntity = emailFolderJpaRepository.findByUser_UserIdAndName(userId, "sent");

		return  folderEntity.getEmailFolderId();

	}

}
