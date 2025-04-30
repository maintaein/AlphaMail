package com.alphamail.api.erp.presentation.dto.product;

public record RegistProductRequest(
	Integer companyId,
	String name,
	String standard,
	Integer stock,
	Long inboundPrice,
	Long outboundPrice,
	String image
) { }
