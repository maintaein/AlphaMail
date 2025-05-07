package com.alphamail.api.erp.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class QuoteProduct {
	private Integer quoteProductId;
	private Integer count;
	private Long price;
	private Product product;

	@Setter
	private Quote quote;

	public void update(Integer count, Long price, Product product) {
		this.count = count;
		this.price = price;
		this.product = product;
	}
}
