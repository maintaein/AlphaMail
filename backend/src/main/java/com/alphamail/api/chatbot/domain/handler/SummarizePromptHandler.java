package com.alphamail.api.chatbot.domain.handler;

import java.util.List;
import java.util.Map;

public interface SummarizePromptHandler {
	String getDocumentType();
	String generateReply(String query, String timezone, List<Map<String, String>> docs);
}
