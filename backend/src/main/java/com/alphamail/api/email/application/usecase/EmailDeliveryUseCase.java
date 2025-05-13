package com.alphamail.api.email.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;
import com.alphamail.api.email.domain.repository.EmailRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EmailDeliveryUseCase {
	private final EmailRepository emailRepository;

	public void execute(String sesResponseId, String actualMessageId, EmailStatus newStatus) {
		Email email = emailRepository.findBySesMessageId(sesResponseId);

		if(email !=null) {
			if(actualMessageId != null && (email.getMessageId() == null
				|| !email.getMessageId().equals(actualMessageId))) {
				String newThreadId = actualMessageId.replaceAll("[<>]", "").split("@")[0];

				//이 경우에는 첫 대화(쓰레드아이디가 만들어져야함)
				if(email.getInReplyTo() == null && email.getReferences() == null) {
					emailRepository.updateMessageIdAndThreadId(
						email.getEmailId(), actualMessageId, newThreadId);

				}else  {
					emailRepository.updateMessageId(
						email.getEmailId(), actualMessageId
					);
				}
			}

			emailRepository.updateStatus(email.getEmailId(), newStatus);
			log.info("이메일 ID [{}]의 상태를 [{}]로 업데이트", email.getEmailId(), newStatus);
		}else {
			log.warn("SES 응답 ID [{}]에 해당하는 이메일을 찾을 수 없음", sesResponseId);
		}
	}
}
