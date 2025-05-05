package com.alphamail.api.erp.presentation.dto.purchaseorder;

import java.time.LocalDateTime;

public record PurchaseOrderSearchCondition(
	Integer companyId,
	String clientName,
	String orderNo,
	String userName,
	String productName,
	LocalDateTime startDate,
	LocalDateTime endDate
) {
}