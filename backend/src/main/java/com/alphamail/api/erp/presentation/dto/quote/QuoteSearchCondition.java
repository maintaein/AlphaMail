package com.alphamail.api.erp.presentation.dto.quote;

import java.time.LocalDateTime;

public record QuoteSearchCondition(
	String clientName,
	String quoteNo,
	String userName,
	String productName,
	LocalDateTime startDate,
	LocalDateTime endDate
) {
}
