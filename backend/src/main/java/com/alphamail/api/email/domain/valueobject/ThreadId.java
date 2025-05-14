package com.alphamail.api.email.domain.valueobject;

import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.Value;

@Value
public class ThreadId {
	String value;

	private ThreadId (String value) {
		this.value = value;
	}

	//공통 설정 쓰레드 아이디 -  3가지 케이스
	public static ThreadId fromEmailHeaders(String references, String inReplyTo, String currMessageId) {
		//1. 메일 2번 이상 오갔을 떄 - references의 첫 message-id로 설정
		if(references !=null && !references.isEmpty()) {
			String firstMessageId = extractFirstMessageId(references);
			if(firstMessageId != null) {
				return new ThreadId(extractIdFromMessageId(firstMessageId));
			}
		}

		//2. 우리 서비스에서 첫 답장을 할 때 - 답장 대상 이메일의 message-id로 설정
		if(inReplyTo !=null && !inReplyTo.isEmpty()) {
			return new ThreadId(extractIdFromMessageId(inReplyTo));
		}
		
		
		//3. 우리가 아예 첫 스타트를 끊을 때 - 우리의 message-id로 설정
		if(currMessageId != null && !currMessageId.isEmpty()) {
			return new ThreadId(extractIdFromMessageId(currMessageId));
		}else {
			ThreadId threadId = generate();
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

		return UUID.nameUUIDFromBytes(cleanId.getBytes()).toString();
	}

}
