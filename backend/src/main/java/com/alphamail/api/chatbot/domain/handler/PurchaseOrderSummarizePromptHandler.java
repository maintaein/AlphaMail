package com.alphamail.api.chatbot.domain.handler;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.chatbot.infrastructure.prompt.SummarizePrompt;

@Component(DocumentTypes.PURCHASE_ORDER)
public class PurchaseOrderSummarizePromptHandler implements SummarizePromptHandler {

	private final SummarizePrompt prompt;

	public PurchaseOrderSummarizePromptHandler(SummarizePrompt prompt) {
		this.prompt = prompt;
	}

	@Override
	public String getDocumentType() {
		return "발주서";
	}

	@Override
	public String generateReply(String query, List<Map<String, String>> docs) {
		return prompt.generateAnswer(getDocumentType(), query, docs);
	}
}
