package com.alphamail.api.chatbot.infrastructure.adapter;

import java.util.Map;

import com.alphamail.api.chatbot.domain.common.VectorizableDocument;
import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.erp.domain.entity.Quote;

public class QuoteVectorAdapter implements VectorizableDocument {

	private final Quote quote;

	public QuoteVectorAdapter(Quote quote) {
		this.quote = quote;
	}

	@Override
	public String toVectorText() {
		return """
			등록번호: %s
			거래처명: %s
			거래처 담당자명: %s
			배송지: %s
			견적일(견적서 생성일): %s
			""".formatted(
			quote.getQuoteNo(),
			quote.getClient().getCorpName(),
			quote.getManager(),
			quote.getShippingAddress(),
			quote.getCreatedAt()
		);
	}

	@Override
	public Map<String, Object> toMetadata() {
		return Map.of(
			"owner_id", quote.getCompany().getCompanyId(),
			"owner_type", "company",
			"user_id", quote.getUser().getId().getValue(),
			"document_type", getDocumentType(),
			"domain_id", quote.getQuoteId()
		);
	}

	@Override
	public String getId() {
		return String.valueOf(quote.getQuoteId());
	}

	@Override
	public String getDocumentType() {
		return DocumentTypes.QUOTE;
	}
}
