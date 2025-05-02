package com.alphamail.api.email.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.email.domain.entity.EmailFolder;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.infrastructure.entity.EmailFolderEntity;
import com.alphamail.api.email.infrastructure.mapper.EmailFolderMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailFolderRepositoryImpl implements EmailFolderRepository {

	private final EmailFolderJpaRepository emailFolderJpaRepository;
	private final EmailFolderMapper emailFolderMapper;

	@Override
	public Integer getSentFolderId(Integer userId) {
		EmailFolderEntity folderEntity = emailFolderJpaRepository.findByUser_UserIdAndName(userId, "sent");

		return  folderEntity.getEmailFolderId();

	}

	@Override
	public String getFolderNameById(Integer folderId) {
		EmailFolderEntity folderEntity = emailFolderJpaRepository.findById(folderId).orElse(null);
		return folderEntity.getName();
	}

	@Override
	public EmailFolder findById(Integer folderId) {
		EmailFolderEntity folderEntity = emailFolderJpaRepository.findById(folderId).orElse(null);

		return emailFolderMapper.toDomain(folderEntity);
	}

}
