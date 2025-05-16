package com.alphamail.api.chatbot.domain.handler;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.chatbot.infrastructure.prompt.SummarizePrompt;

@Component(DocumentTypes.QUOTE)
public class QuoteSummarizePromptHandler implements SummarizePromptHandler {

	private final SummarizePrompt prompt;

	public QuoteSummarizePromptHandler(SummarizePrompt prompt) {
		this.prompt = prompt;
	}

	@Override
	public String getDocumentType() {
		return "견적서";
	}

	@Override
	public String generateReply(String query, String timezone, List<Map<String, String>> docs) {
		return prompt.generateAnswer(getDocumentType(), query, timezone, docs);
	}
}
