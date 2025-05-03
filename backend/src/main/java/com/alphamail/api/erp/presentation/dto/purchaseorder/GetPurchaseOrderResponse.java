package com.alphamail.api.erp.presentation.dto.purchaseorder;

import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;

public record GetPurchaseOrderResponse(
	Integer id,
	Integer userId,
	String userName,
	Integer groupId,
	Integer clientId,
	String orderNo,
	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	LocalDateTime deletedAt,
	LocalDateTime deliverAt,
	List<PurchaseOrderProductDto> products
) {
	public static GetPurchaseOrderResponse from(PurchaseOrder order) {
		return new GetPurchaseOrderResponse(
			order.getPurchaseOrderId(),
			order.getUser().getId().getValue(),
			order.getUser().getName(),
			order.getGroupId(),
			order.getClientId(),
			order.getOrderNo(),
			order.getCreatedAt(),
			order.getUpdatedAt(),
			order.getDeletedAt(),
			order.getDeliverAt(),
			order.getPurchaseOrderProducts().stream()
				.map(PurchaseOrderProductDto::from)
				.toList()
		);
	}
}
