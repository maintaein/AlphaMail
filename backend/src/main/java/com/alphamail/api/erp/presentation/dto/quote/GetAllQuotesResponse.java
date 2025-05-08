package com.alphamail.api.erp.presentation.dto.quote;

import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.erp.domain.entity.Quote;
import com.alphamail.api.erp.domain.entity.QuoteProduct;

public record GetAllQuotesResponse(
	Integer id,
	String quoteNo,
	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	String userName,
	String clientName,
	Integer productCount,
	String productName,
	Long price
) {
	public static GetAllQuotesResponse from(Quote quote) {
		return new GetAllQuotesResponse(
			quote.getQuoteId(),
			quote.getQuoteNo(),
			quote.getCreatedAt(),
			quote.getUpdatedAt(),
			quote.getUser().getName(),
			quote.getClient().getCorpName(),
			quote.getQuoteProducts().size(),
			quote.getQuoteProducts().get(0).getProduct().getName(),
			calculateTotalPrice(quote.getQuoteProducts())
		);
	}

	public static Long calculateTotalPrice(List<QuoteProduct> quoteProducts) {
		if (quoteProducts == null || quoteProducts.isEmpty()) {
			return 0L;
		}

		long totalPrice = 0L;
		for (QuoteProduct quoteProduct : quoteProducts) {
			if (quoteProduct.getPrice() != null && quoteProduct.getCount() != null) {
				totalPrice += quoteProduct.getPrice() * quoteProduct.getCount();
			}
		}
		return totalPrice;
	}
}
