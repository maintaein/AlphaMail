package com.alphamail.api.email.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.EmailFolder;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DeleteDetailUseCase {

	private final EmailRepository emailRepository;
	private final EmailFolderRepository emailFolderRepository;

	public void execute(Integer emailId, Integer userId) {

		if (!emailRepository.validateEmailOwnership(List.of(emailId), userId)) {
			throw new ForbiddenException(ErrorMessage.ACCESS_DENIED);
		}

		EmailFolder trashFolder = emailFolderRepository.findByUserIdAndFolderName(userId, "TRASH");

		emailRepository.updateFolder(List.of(emailId), trashFolder.getEmailFolderId());
	}
}
