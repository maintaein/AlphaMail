package com.alphamail.api.email.application.usecase;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.EmailFolder;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.presentation.dto.FolderResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetFolderUseCase {
	private final EmailFolderRepository emailFolderRepository;

	public List<FolderResponse> execute(Integer userId) {
		List<EmailFolder> folders = emailFolderRepository.findAllByUserId(userId);

		return folders.stream()
			.map(folder -> new FolderResponse(
				folder.getEmailFolderId(),
				folder.getEmailFolderName()
			))
			.collect(Collectors.toList());
	}
}
