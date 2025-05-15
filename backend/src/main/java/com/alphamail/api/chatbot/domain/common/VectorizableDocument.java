package com.alphamail.api.chatbot.domain.common;

import java.util.Map;

public interface VectorizableDocument {
	String toVectorText();
	Map<String, Object> toMetadata();
	String getId();
	String getDocumentType();
	default String getVectorId() {
		return getDocumentType() + "_" + getId();
	}
}
