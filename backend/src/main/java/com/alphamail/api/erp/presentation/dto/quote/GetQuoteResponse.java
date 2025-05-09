package com.alphamail.api.erp.presentation.dto.quote;

import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.erp.domain.entity.Quote;

public record GetQuoteResponse(
	Integer id,
	Integer userId,
	String userName,
	Integer groupId,
	String groupName,
	Integer clientId,
	String clientName,
	String manager,
	String managerNumber,
	String licenseNumber,
	String businessType,
	String businessItem,
	String shippingAddress,
	String quoteNo,
	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	List<QuoteProductDto> products
) {
	public static GetQuoteResponse from(Quote quote) {
		return new GetQuoteResponse(
			quote.getQuoteId(),
			quote.getUser().getId().getValue(),
			quote.getUser().getName(),
			quote.getGroup().getGroupId(),
			quote.getGroup().getName(),
			quote.getClient().getClientId(),
			quote.getClient().getCorpName(),
			quote.getManager(),
			quote.getManagerNumber(),
			quote.getClient().getBusinessLicense(),
			quote.getClient().getBusinessType(),
			quote.getClient().getBusinessItem(),
			quote.getShippingAddress(),
			quote.getQuoteNo(),
			quote.getCreatedAt(),
			quote.getUpdatedAt(),
			quote.getQuoteProducts().stream()
				.map(QuoteProductDto::from)
				.toList()
		);
	}
}
