package com.alphamail.api.email.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.infrastructure.entity.EmailEntity;
import com.alphamail.api.user.infrastructure.entity.UserEntity;

public interface EmailJpaRepository extends JpaRepository<EmailEntity, Integer> {

	Page<EmailEntity> findByFolder_EmailFolderIdAndUser_UserId(Integer folderId, Integer userId, Pageable pageable);

	int countByFolder_EmailFolderIdAndUser_UserId(Integer folderId, Integer userId);

	int countByFolder_EmailFolderIdAndUser_UserIdAndReadStatusTrue(Integer folderId, Integer userId);

	Page<EmailEntity> findByFolder_EmailFolderIdAndUser_UserIdAndSubjectContaining(
		Integer folderId, Integer userId, String query, Pageable pageable);

	List<EmailEntity> user(UserEntity user);

	Optional<EmailEntity> findByEmailIdAndUser_UserId(Integer emailId, Integer userId);

	@Modifying(clearAutomatically = true)
	@Query("UPDATE EmailEntity e SET " +
		"e.originalFolderId = CASE WHEN e.originalFolderId IS NULL THEN e.folder.emailFolderId ELSE e.originalFolderId END, " +
		"e.folder.emailFolderId = :folderId " +
		"WHERE e.emailId IN :emailIds")
	void updateFolderByEmailIds(@Param("emailIds") List<Integer> emailIds, @Param("folderId") Integer folderId);

	long countByEmailIdInAndUser_UserId(List<Integer> emailIds, Integer userId);
}
