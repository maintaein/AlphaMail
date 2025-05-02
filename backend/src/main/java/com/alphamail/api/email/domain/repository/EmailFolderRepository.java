package com.alphamail.api.email.domain.repository;

import com.alphamail.api.email.domain.entity.EmailFolder;

public interface EmailFolderRepository {

	Integer getSentFolderId(Integer userId);

	EmailFolder findById(Integer id);

	String getFolderNameById(Integer folderId);
}
