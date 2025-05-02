package com.alphamail.api.email.application.usecase;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.presentation.dto.EmailListResponse;
import com.alphamail.api.email.presentation.dto.EmailResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetEmailUseCase {
	private final EmailRepository emailRepository;
	private final EmailFolderRepository emailFolderRepository;

	public EmailListResponse execute(Integer folderId, Integer userId, String query, String sort, Pageable pageable) {

		String folderName = emailFolderRepository.getFolderNameById(folderId);

		//폴더 이름(ex.보낸메일함, 받은메일함) 따라서 갖고오는 field 다름
		String sortField;
		if ("sent".equalsIgnoreCase(folderName)) {
			sortField = "sentDateTime";
		} else {
			sortField = "receivedDateTime";
		}

		// 정렬 방향
		Sort.Direction direction = "asc".equalsIgnoreCase(sort)
			? Sort.Direction.ASC
			: Sort.Direction.DESC;

		// 폴더에 따른 pageable
		Pageable pageableWithSort = PageRequest.of(
			pageable.getPageNumber(),
			pageable.getPageSize(),
			Sort.by(direction, sortField)
		);

		Page<Email> emailPage;

		if (StringUtils.hasText(query)) {
			emailPage = emailRepository.searchByFolderIdAndUserId(folderId, userId, query, pageableWithSort);
		} else {
			emailPage = emailRepository.findByFolderIdAndUserId(folderId, userId, pageableWithSort);
		}

		int totalCount = emailRepository.countByFolderIdAndUserId(folderId, userId);
		int readCount = emailRepository.countReadByFolderIdAndUserId(folderId, userId);

		List<EmailResponse> emailResponses = emailPage.getContent().stream()
			.map(email -> new EmailResponse(
				email.getEmailId(),
				email.getSender(),
				email.getSubject(),
				email.getReceivedDateTime(),
				email.getSentDateTime(),
				calculateSize(email),
				email.getReadStatus()
			))
			.collect(Collectors.toList());

		return new EmailListResponse(emailResponses, totalCount, readCount, emailPage.getTotalPages(),
			emailPage.getNumber());
	}

	private Integer calculateSize(Email email) {
		return (email.getBodyText() != null ? email.getBodyText().length() : 0)
			+ (email.getBodyHtml() != null ? email.getBodyHtml().length() : 0);

	}

}
