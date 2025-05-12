package com.alphamail.api.email.infrastructure.adapter;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.Properties;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.port.EmailSenderPort;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.InternalServerException;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.MessageRejectedException;
import com.amazonaws.services.simpleemail.model.RawMessage;
import com.amazonaws.services.simpleemail.model.SendRawEmailRequest;

import jakarta.mail.Message;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class EmailSenderPortImpl implements EmailSenderPort {

	private final AmazonSimpleEmailService sesClient;

	@Override
	public void send(Email email, List<MultipartFile> multipartFiles) {
		// AWS SES 사용한 이메일 발송 구현

		try {
			// JavaMail 세션 생성
			Session session = Session.getDefaultInstance(new Properties());
			MimeMessage message = new MimeMessage(session);

			// 기본 필드 설정
			message.setFrom(new InternetAddress(email.getSender()));
			message.setSubject(email.getSubject(), "UTF-8");

			// 수신자 설정
			if (email.getRecipients() == null || email.getRecipients().isEmpty()) {
				throw new InternalServerException(ErrorMessage.INVALID_PARAMETER);
			}

			// 수신자 설정
			for (String recipient : email.getRecipients()) {
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient.trim()));
			}

			// 스레드 관련 헤더 설정
			if (email.getInReplyTo() != null && !email.getInReplyTo().isEmpty()) {
				message.setHeader("In-Reply-To", email.getInReplyTo());
			}

			if (email.getReferences() != null && !email.getReferences().isEmpty()) {
				message.setHeader("References", email.getReferences());
			}

			// 본문 설정
			MimeMultipart multipart = new MimeMultipart("alternative");

			// 텍스트 버전
			if (email.getBodyText() != null) {
				MimeBodyPart textPart = new MimeBodyPart();
				textPart.setContent(email.getBodyText(), "text/plain; charset=UTF-8");
				multipart.addBodyPart(textPart);
			}

			// HTML 버전
			if (email.getBodyHtml() != null) {
				MimeBodyPart htmlPart = new MimeBodyPart();
				htmlPart.setContent(email.getBodyHtml(), "text/html; charset=UTF-8");
				multipart.addBodyPart(htmlPart);
			} else {
				// HTML이 없는 경우 빈 HTML 설정
				MimeBodyPart htmlPart = new MimeBodyPart();
				htmlPart.setContent("<div></div>", "text/html; charset=UTF-8");
				multipart.addBodyPart(htmlPart);
			}

			// 첨부 파일 처리
			if (email.getHasAttachment() && multipartFiles != null && !multipartFiles.isEmpty()) {
				// 1. 본문을 contentPart로 래핑
				MimeBodyPart contentPart = new MimeBodyPart();
				contentPart.setContent(multipart);

				// 2. mixed 타입의 MimeMultipart 생성
				MimeMultipart mixedMultipart = new MimeMultipart("mixed");
				mixedMultipart.addBodyPart(contentPart); // 본문 추가

				// 3. 각 MultipartFile을 첨부파일로 추가
				for (MultipartFile file : multipartFiles) {
					MimeBodyPart attachmentPart = new MimeBodyPart();
					attachmentPart.setFileName(file.getOriginalFilename());
					attachmentPart.setContent(file.getBytes(), file.getContentType());
					attachmentPart.setHeader("Content-Type", file.getContentType());
					attachmentPart.setHeader("Content-Disposition",
						"attachment; filename=\"" + file.getOriginalFilename() + "\"");

					mixedMultipart.addBodyPart(attachmentPart);
				}

				// 4. 최종적으로 message에 mixedMultipart 설정
				message.setContent(mixedMultipart);
			} else {
				// 첨부가 없으면 alternative multipart 그대로 설정
				message.setContent(multipart);
			}

			// RawMessage로 변환
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			message.writeTo(outputStream);
			RawMessage rawMessage = new RawMessage(ByteBuffer.wrap(outputStream.toByteArray()));

			// SendRawEmail 요청 생성 및 전송
			SendRawEmailRequest rawRequest = new SendRawEmailRequest()
				.withRawMessage(rawMessage);

			sesClient.sendRawEmail(rawRequest);

		} catch (MessageRejectedException e) {
			// 로그 추가
			log.error("SES 메시지 거부: {}", e.getMessage(), e);
			throw new InternalServerException(ErrorMessage.FILE_UPLOAD_FAIL);
		} catch (Exception e) {
			// 로그 추가
			System.err.println("Error sending email: " + e.getMessage());
			e.printStackTrace();
			throw new InternalServerException(ErrorMessage.INTERNAL_SERVER_ERROR);
		}
	}
}

