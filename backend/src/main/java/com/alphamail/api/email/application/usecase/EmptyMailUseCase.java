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

	private final EmailRepository emailRepository;

	public Integer execute(EmptyTrashRequest request, Integer userId) {

		if (request.mailIds() == null || request.mailIds().isEmpty()) {
			return 0;
		}

		if (!emailRepository.validateEmailOwnership(request.mailIds(), userId)) {
			throw new ForbiddenException(ErrorMessage.FORBIDDEN);
		}

		if (!emailRepository.areAllEmailsInTrash(request.mailIds(), userId)) {
			throw new BadRequestException(ErrorMessage.NOT_IN_TRASH_FOLDER);
		}

		return emailRepository.deleteSelectedEmails(request.mailIds(), userId);
	}
}
