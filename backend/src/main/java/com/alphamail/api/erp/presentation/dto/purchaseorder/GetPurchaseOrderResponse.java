package com.alphamail.api.erp.presentation.dto.purchaseorder;

import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;

public record GetPurchaseOrderResponse(
	Integer id,
	Integer userId,
	String userName,
	Integer groupId,
	String groupName,
	Integer clientId,
	String clientName,
	String orderNo,
	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	LocalDateTime deliverAt,
	List<PurchaseOrderProductDto> products
) {
	public static GetPurchaseOrderResponse from(PurchaseOrder order) {
		return new GetPurchaseOrderResponse(
			order.getPurchaseOrderId(),
			order.getUser().getId().getValue(),
			order.getUser().getName(),
			order.getGroup().getGroupId(),
			order.getGroup().getName(),
			order.getClient().getClientId(),
			order.getClient().getCorpName(),
			order.getOrderNo(),
			order.getCreatedAt(),
			order.getUpdatedAt(),
			order.getDeliverAt(),
			order.getPurchaseOrderProducts().stream()
				.map(PurchaseOrderProductDto::from)
				.toList()
		);
	}
}
