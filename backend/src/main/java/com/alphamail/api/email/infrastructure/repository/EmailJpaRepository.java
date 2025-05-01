package com.alphamail.api.email.infrastructure.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.alphamail.api.email.infrastructure.entity.EmailEntity;

public interface EmailJpaRepository extends JpaRepository<EmailEntity, Integer> {

	Page<EmailEntity> findByFolder_EmailFolderIdAndUser_UserId(Integer folderId, Integer userId, Pageable pageable);

	int countByFolder_EmailFolderIdAndUser_UserId(Integer folderId, Integer userId);

	int countByFolder_EmailFolderIdAndUser_UserIdAndReadStatusTrue(Integer folderId, Integer userId);

	Page<EmailEntity> findByFolder_EmailFolderIdAndUser_UserIdAndSubjectContaining(
		Integer folderId, Integer userId, String query, Pageable pageable);
}
