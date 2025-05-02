package com.alphamail.api.email.domain.repository;

import java.util.List;

import com.alphamail.api.email.domain.entity.EmailFolder;

public interface EmailFolderRepository {

	Integer getSentFolderId(Integer userId);

	EmailFolder findById(Integer id);

	String getFolderNameById(Integer folderId);

	List<EmailFolder> findAllByUserId(Integer userId);
}
