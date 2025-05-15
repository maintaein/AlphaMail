package com.alphamail.api.chatbot.domain.handler;

import java.util.List;
import java.util.Map;

public interface SummarizePromptHandler {
	String getDocumentType();
	String generateReply(String query, List<Map<String, String>> docs);
}
