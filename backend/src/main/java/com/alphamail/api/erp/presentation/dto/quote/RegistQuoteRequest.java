package com.alphamail.api.erp.presentation.dto.quote;

import java.util.List;

// 견적서 등록용
public record RegistQuoteRequest(
	Integer userId,
	Integer companyId,
	Integer groupId,
	Integer clientId,
	String quoteNo,
	List<QuoteProductDto> products
) {
	public record QuoteProductDto(
		Integer quoteProductId,
		Integer productId,
		Integer count,
		Long price
	) {}
}
