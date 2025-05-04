package com.alphamail.api.erp.presentation.dto.product;

public record ModifyProductRequest(
	String name,
	String standard,
	Integer stock,
	Long inboundPrice,
	Long outboundPrice,
	String image
) { }
