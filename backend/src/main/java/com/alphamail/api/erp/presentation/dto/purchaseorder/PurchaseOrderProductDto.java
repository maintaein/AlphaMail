package com.alphamail.api.erp.presentation.dto.purchaseorder;

import java.time.LocalDateTime;

import com.alphamail.api.erp.domain.entity.PurchaseOrderProduct;

public record PurchaseOrderProductDto(
	Integer id,
	String name,
	String standard,
	Integer count,
	Long price,
	LocalDateTime deletedAt
) {
	public static PurchaseOrderProductDto from(PurchaseOrderProduct pop) {
		return new PurchaseOrderProductDto(
			pop.getProduct().getProductId(),
			pop.getProduct().getName(),
			pop.getProduct().getStandard(),
			pop.getCount(),
			pop.getPrice(),
			pop.getProduct().getDeletedAt()
		);
	}
}
