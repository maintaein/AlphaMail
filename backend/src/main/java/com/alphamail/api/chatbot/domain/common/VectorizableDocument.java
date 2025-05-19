package com.alphamail.api.chatbot.domain.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public interface VectorizableDocument {
	String toVectorText();
	Map<String, Object> toMetadata();
	String getId();
	String getDocumentType();
	default String getVectorId() {
		return getDocumentType() + "_" + getId();
	}

	DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분");
	default String formatDateTime(LocalDateTime dateTime) {
		if (dateTime == null) { return "";}
		return dateTime.format(DATE_TIME_FORMATTER);
	}
}
