package com.alphamail.api.erp.presentation.dto.quote;

import java.util.List;

public record RegistQuoteRequest(
	Integer userId,
	Integer companyId,
	Integer groupId,
	Integer clientId,
	String quoteNo,
	String shippingAddress,
	String manager,
	String managerNumber,
	List<QuoteProductDto> products
) {
	public record QuoteProductDto(
		Integer quoteProductId,
		Integer productId,
		Integer count,
		Long price
	) {
	}
}
