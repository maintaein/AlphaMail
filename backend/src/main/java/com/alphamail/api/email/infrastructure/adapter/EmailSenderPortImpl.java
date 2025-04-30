package com.alphamail.api.email.infrastructure.adapter;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.Properties;

import org.springframework.stereotype.Component;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.port.EmailSenderPort;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.RawMessage;
import com.amazonaws.services.simpleemail.model.SendRawEmailRequest;

import jakarta.mail.Message;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailSenderPortImpl implements EmailSenderPort {

	private final AmazonSimpleEmailService sesClient;

	@Override
	public void send(Email email) {
		// AWS SES 사용한 이메일 발송 구현
		try {
			// JavaMail 세션 생성
			Session session = Session.getDefaultInstance(new Properties());
			MimeMessage message = new MimeMessage(session);

			// 기본 필드 설정
			message.setFrom(new InternetAddress(email.getSender()));
			message.setSubject(email.getSubject(), "UTF-8");

			// 수신자 설정
			for (String recipient : email.getRecipients().split(",")) {
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
			}

			message.setContent(multipart);

			// 첨부 파일 처리 (필요하다면)
			if (email.getHasAttachments()) {
				// MimeMultipart를 mixed 타입으로 변경 (alternative는 본문 표현 방식만 다른 경우)
				MimeMultipart mixedMultipart = new MimeMultipart("mixed");

				MimeBodyPart contentPart = new MimeBodyPart();
				contentPart.setContent(multipart);
				mixedMultipart.addBodyPart(contentPart);
			}

			// RawMessage로 변환
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			message.writeTo(outputStream);
			RawMessage rawMessage = new RawMessage(ByteBuffer.wrap(outputStream.toByteArray()));

			// SendRawEmail 요청 생성 및 전송
			SendRawEmailRequest rawRequest = new SendRawEmailRequest()
				.withRawMessage(rawMessage);

			sesClient.sendRawEmail(rawRequest);

		} catch (Exception e) {
			throw new RuntimeException("이메일 전송 실패: " + e.getMessage(), e);
		}
	}
}
