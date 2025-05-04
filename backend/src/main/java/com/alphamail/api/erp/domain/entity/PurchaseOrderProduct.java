package com.alphamail.api.erp.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PurchaseOrderProduct {
	private Integer purchaseOrderProductId;
	private Integer count;
	private Long price;
	private Product product;
}
