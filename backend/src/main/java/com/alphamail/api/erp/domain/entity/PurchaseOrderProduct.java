package com.alphamail.api.erp.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PurchaseOrderProduct {
	private Integer purchaseOrderProductId;
	private Integer count;
	private Long price;
	private Product product;

	public void update(Integer count, Long price, Product product) {
		this.count = count;
		this.price = price;
		this.product = product;
	}
}
