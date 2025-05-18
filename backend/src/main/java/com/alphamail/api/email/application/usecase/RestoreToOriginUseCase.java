package com.alphamail.api.email.application.usecase;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.repository.EmailRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestoreToOriginUseCase {

	private final EmailRepository emailRepository;

	@Transactional
	public boolean execute(List<Integer> emailIds, Integer userId) {
		log.info("Restoring emails to original folders. EmailIds: {}, UserId: {}", emailIds, userId);

		if (emailIds == null || emailIds.isEmpty()) {
			log.warn("Empty email IDs list provided for restoration");
			return false;
		}

		// 이메일 소유권 검증
		try {
			if (!emailRepository.validateEmailOwnership(emailIds, userId)) {
				log.warn("Email ownership validation failed for user: {} and emails: {}", userId, emailIds);
				return false;
			}
		} catch (DataAccessException e) {
			log.error("Database error during email ownership validation: {}", e.getMessage(), e);
			return false;
		} catch (Exception e) {
			log.error("Unexpected error during email ownership validation: {}", e.getMessage(), e);
			return false;
		}

		int successCount = 0;
		int failedCount = 0;

		try {
			for (Integer emailId : emailIds) {
				try {
					log.debug("Processing email ID: {}", emailId);
					Optional<Email> emailOptional = emailRepository.findByIdAndUserId(emailId, userId);

					if (emailOptional.isEmpty()) {
						log.warn("Email not found or not owned by user. EmailId: {}, UserId: {}", emailId, userId);
						failedCount++;
						continue;
					}

					Email email = emailOptional.get();
					Integer originalFolderId = email.getOriginalFolderId();

					if (originalFolderId == null) {
						log.warn("Original folder ID is null for email: {}", emailId);
						failedCount++;
						continue;
					}

					log.debug("Restoring email: {} to original folder: {}", emailId, originalFolderId);
					emailRepository.updateFolder(List.of(emailId), originalFolderId);
					successCount++;
					log.debug("Successfully restored email: {} to folder: {}", emailId, originalFolderId);

				} catch (DataAccessException e) {
					log.error("Database error while processing email ID {}: {}", emailId, e.getMessage(), e);
					failedCount++;
				} catch (Exception e) {
					log.error("Unexpected error while processing email ID {}: {}", emailId, e.getMessage(), e);
					failedCount++;
				}
			}

			log.info("Email restoration completed. Success: {}, Failed: {}", successCount, failedCount);
			return successCount > 0; // 하나 이상 성공했으면 true 반환

		} catch (Exception e) {
			log.error("Critical error during email restoration process: {}", e.getMessage(), e);
			return false;
		}
	}
}