package com.alphamail.api.erp.presentation.dto.purchaseorder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.entity.PurchaseOrderProduct;

public record GetAllPurchaseOrdersResponse(
	Integer id,
	String orderNo,
	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	String userName,
	String clientName,
	LocalDateTime deliverAt,
	Integer productCount,
	String productName,
	Long price
) {
	public static GetAllPurchaseOrdersResponse from(PurchaseOrder purchaseOrder) {
		return new GetAllPurchaseOrdersResponse(
			purchaseOrder.getPurchaseOrderId(),
			purchaseOrder.getOrderNo(),
			purchaseOrder.getCreatedAt(),
			purchaseOrder.getUpdatedAt(),
			purchaseOrder.getUser().getName(),
			purchaseOrder.getClient().getCorpName(),
			purchaseOrder.getDeliverAt(),
			purchaseOrder.getPurchaseOrderProducts().size(),
			purchaseOrder.getPurchaseOrderProducts().get(0).getProduct().getName(),
			calculateTotalPrice(purchaseOrder.getPurchaseOrderProducts())
		);
	}

	public static Long calculateTotalPrice(List<PurchaseOrderProduct> orderProducts) {
		if (orderProducts == null || orderProducts.isEmpty()) {
			return 0L;
		}

		long totalPrice = 0L;
		for (PurchaseOrderProduct orderProduct : orderProducts) {
			if (orderProduct.getPrice() != null && orderProduct.getCount() != null) {
				totalPrice += orderProduct.getPrice() * orderProduct.getCount();
			}
		}
		return totalPrice;
	}
}
