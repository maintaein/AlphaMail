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

		String localPart = cleanId;
		if (cleanId.contains("@")) {
			localPart = cleanId.split("@")[0].trim();
		}

		// 1. SES 형식 확인 (하이픈으로 구분된 긴 ID)
		if (localPart.contains("-") && localPart.length() > 30) {
			return localPart;
		}

		// todo: 다른 메일 형식들도 다르면 추가해줘야 같은 쓰레드 아이디로 묶을 수 있을듯

		// 2. 네이버 메시지 ID 형식 (32자리 16진수)
		if (localPart.matches("[a-fA-F0-9]{32}")) {
			return localPart;
		}

		// 3. 지메일 메시지 ID 형식 (일정 길이 이상의 영숫자 + 특수문자)
		// 지메일 ID는 + = 등 특수문자를 포함하며 길이가 변할 수 있음
		if (localPart.length() >= 20 && localPart.startsWith("CAF")) {
			// 지메일 ID는 그대로 반환하지만, 특수문자로 인한 문제 방지를 위해
			// 해시 기반 변환을 적용 (일관성 유지)
			return new UUID(Math.abs(localPart.hashCode()), 0).toString();
		}

		// 4. 기타 형식에 대한 일관된 해시 기반 ID 생성
		return new UUID(Math.abs(localPart.hashCode()), 0).toString();
	}

}
