package com.alphamail.api.email.domain.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;

public interface EmailRepository {
	Email save(Email email);

	Email updateStatus(Integer emailId, EmailStatus status);

	Page<Email> findByFolderIdAndUserId(Integer folderId, Integer userId, Pageable pageable);

	Page<Email> searchByFolderIdAndUserId(Integer folderId, Integer userId, String query, Pageable pageable);

	int countByFolderIdAndUserId(Integer folderId, Integer userId);

	int countReadByFolderIdAndUserId(Integer folderId, Integer userId);

	Optional<Email> findByIdAndUserId(Integer emailId, Integer userId);

	void updateFolder(List<Integer> integers, Integer emailFolderId);

	boolean validateEmailOwnership(List<Integer> emailIds, Integer userId);
}
