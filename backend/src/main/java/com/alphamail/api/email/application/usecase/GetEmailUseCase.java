package com.alphamail.api.email.application.usecase;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.presentation.dto.EmailListResponse;
import com.alphamail.api.email.presentation.dto.EmailResponse;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetEmailUseCase {
	private final EmailRepository emailRepository;

	public EmailListResponse execute(Integer folderId, Integer userId, String query, Pageable pageable) {

		Page<Email> emailPage;

		if (StringUtils.hasText(query)) {
			emailPage = emailRepository.searchByFolderIdAndUserId(folderId, userId, query, pageable);
		} else {
			emailPage = emailRepository.findByFolderIdAndUserId(folderId, userId, pageable);
		}

		int totalCount = emailRepository.countByFolderIdAndUserId(folderId, userId);
		int readCount = emailRepository.countReadByFolderIdAndUserId(folderId, userId);

		List<EmailResponse> emailResponses = emailPage.getContent().stream()
			.map(email -> new EmailResponse(
				email.getEmailId(),
				email.getSender(),
				email.getSubject(),
				email.getReceivedDateTime(),
				calculateSize(email),
				email.getReadStatus()
			))
			.collect(Collectors.toList());

		return new EmailListResponse(emailResponses, totalCount, readCount, emailPage.getTotalPages(),
			emailPage.getNumber());
	}

	private Integer calculateSize(Email email) {
		return (email.getBodyText() != null ? email.getBodyText().length() : 0) +
			(email.getBodyHtml() != null ? email.getBodyHtml().length() : 0);

	}

}
