package com.alphamail.api.erp.presentation.dto.purchaseorder;

import java.time.LocalDateTime;
import java.util.List;

public record RegistPurchaseOrderRequest(
	Integer userId,
	Integer groupId,
	Integer clientId,
	String orderNo,
	LocalDateTime deliverAt,
	List<ProductInfo> products
) {
	public record ProductInfo(
		Integer purchaseOrderProductId,
		Integer productId,
		Integer count,
		Long price
	) {
	}
}
