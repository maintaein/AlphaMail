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
	String licenseNumber,
	String representative,
	String businessType,
	String businessItem,
	String manager,
	String managerNumber,
	String paymentTerm,
	String shippingAddress,
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
			order.getClient().getBusinessLicense(),
			order.getClient().getRepresentative(),
			order.getClient().getBusinessType(),
			order.getClient().getBusinessItem(),
			order.getManager(),
			order.getManagerNumber(),
			order.getPaymentTerm(),
			order.getShippingAddress(),
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
