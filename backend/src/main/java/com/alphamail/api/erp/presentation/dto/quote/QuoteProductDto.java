package com.alphamail.api.erp.presentation.dto.quote;

import java.time.LocalDateTime;

import com.alphamail.api.erp.domain.entity.QuoteProduct;

public record QuoteProductDto(
	Integer id,
	String name,
	String standard,
	Integer count,
	Long price,
	LocalDateTime deletedAt
) {
	public static QuoteProductDto from(QuoteProduct quoteProduct) {
		return new QuoteProductDto(
			quoteProduct.getProduct().getProductId(),
			quoteProduct.getProduct().getName(),
			quoteProduct.getProduct().getStandard(),
			quoteProduct.getCount(),
			quoteProduct.getPrice(),
			quoteProduct.getProduct().getDeletedAt()
		);
	}
}
