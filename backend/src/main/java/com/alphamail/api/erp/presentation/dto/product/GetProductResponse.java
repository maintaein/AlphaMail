package com.alphamail.api.erp.presentation.dto.product;

import com.alphamail.api.erp.domain.entity.Product;

public record GetProductResponse(
	Integer id,
	String name,
	String standard,
	Integer stock,
	Long inboundPrice,
	Long outboundPrice,
	String image
) {
	public static GetProductResponse from(Product product) {
		return new GetProductResponse(
			product.getProductId(),
			product.getName(),
			product.getStandard(),
			product.getStock(),
			product.getInboundPrice(),
			product.getOutboundPrice(),
			product.getImage()
		);
	}
}
