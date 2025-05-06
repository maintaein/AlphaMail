package com.alphamail.api.email.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.EmailFolder;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.presentation.dto.EmptyTrashRequest;
import com.alphamail.common.exception.BadRequestException;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class EmptyMailUseCase {

	private final EmailFolderRepository emailFolderRepository;
	private final EmailRepository emailRepository;

	public Integer execute(EmptyTrashRequest request, Integer userId) {
		// 값 체크
		if (request.folderId() == null) {
			throw new BadRequestException(ErrorMessage.NO_FOLDER_ID);
		}

		EmailFolder emailFolder = emailFolderRepository.findById(request.folderId());

		// UserId가 똑같은지 체크
		if (!emailFolder.getUserId().equals(userId)) {
			throw new ForbiddenException(ErrorMessage.FORBIDDEN);
		}

		if (!emailFolder.getEmailFolderName().equals("TRASH")) {
			throw new BadRequestException(ErrorMessage.NO_TRASH_FOLDER);
		}

		return emailRepository.deleteByFolderId(request.folderId(), userId);

	}
}
