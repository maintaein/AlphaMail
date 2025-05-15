package com.alphamail.api.email.domain.valueobject;

import java.io.UnsupportedEncodingException;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.Value;
import lombok.extern.slf4j.Slf4j;

@Value
@Slf4j
public class ThreadId {
	String value;

	private ThreadId (String value) {
		this.value = value;
	}

	//공통 설정 쓰레드 아이디 -  3가지 케이스
	public static ThreadId fromEmailHeaders(String references, String inReplyTo, String currMessageId) {
		log.info("ThreadId 계산 시작 - references: {}, inReplyTo: {}, currMessageId: {}",
			references, inReplyTo, currMessageId);

		//1. 메일 2번 이상 오갔을 떄 - references의 첫 message-id로 설정
		if(references !=null && !references.isEmpty()) {
			String firstMessageId = extractFirstMessageId(references);
			log.info("References에서 추출한 첫 번째 메시지 ID: {}", firstMessageId);

			if(firstMessageId != null) {
				String threadIdValue = extractIdFromMessageId(firstMessageId);
				log.info("References 기반 스레드 ID 생성: {}", threadIdValue);
				return new ThreadId(threadIdValue);
			}
		}

		//2. 우리 서비스에서 첫 답장을 할 때 - 답장 대상 이메일의 message-id로 설정
		if(inReplyTo !=null && !inReplyTo.isEmpty()) {
			String threadIdValue = extractIdFromMessageId(inReplyTo);
			log.info("InReplyTo 기반 스레드 ID 생성: {}", threadIdValue);
			return new ThreadId(threadIdValue);
		}
		
		
		//3. 우리가 아예 첫 스타트를 끊을 때 - 우리의 message-id로 설정
		if(currMessageId != null && !currMessageId.isEmpty()) {
			String threadIdValue = extractIdFromMessageId(currMessageId);
			log.info("CurrentMessageId 기반 스레드 ID 생성: {}", threadIdValue);
			return new ThreadId(threadIdValue);
		}else {
			ThreadId threadId = generate();
			log.info("새로운 랜덤 스레드 ID 생성: {}", threadId.getValue());
			return threadId;
		}
	}

	private static ThreadId generate() {
		return new ThreadId(UUID.randomUUID().toString());
	}

	private static String extractFirstMessageId(String references) {
		if (references == null || references.isEmpty()) {
			return null;
		}

		Pattern pattern = Pattern.compile("<([^>]+)>");
		Matcher matcher = pattern.matcher(references);

		if (matcher.find()) {
			return matcher.group(0);
		}

		return null;
	}

	private static String extractIdFromMessageId(String emailId) {
		if (emailId == null || emailId.isEmpty()) {
			return UUID.randomUUID().toString();
		}

		String cleanId = emailId.replaceAll("[<>]", "").trim();
		log.info("정리된 ID: {}", cleanId);

		try {
			String result = UUID.nameUUIDFromBytes(cleanId.getBytes("UTF-8")).toString();
			log.info("변환된 스레드 ID: {}", result);
			return result;
		} catch (UnsupportedEncodingException e) {
			// UTF-8은 항상 지원되므로 이 예외는 발생하지 않아야 함
			log.error("UTF-8 인코딩 지원 안 됨", e);
			String result = UUID.nameUUIDFromBytes(cleanId.getBytes()).toString();
			log.info("변환된 스레드 ID (기본 인코딩): {}", result);
			return result;
		}
	}

}
