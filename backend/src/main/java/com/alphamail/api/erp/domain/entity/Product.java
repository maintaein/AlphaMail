package com.alphamail.api.erp.domain.entity;

import java.time.LocalDateTime;

import com.alphamail.api.erp.presentation.dto.product.ModifyProductRequest;
import com.alphamail.api.erp.presentation.dto.product.RegistProductRequest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Product {
	private final Integer productId;
	private Integer companyId;
	private String name;
	private String standard;
	private Integer stock = 0;
	private Long inboundPrice;
	private Long outboundPrice;
	private String image;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;

	public static Product of(Integer id) {
		return Product.builder()
			.productId(id)
			.companyId(null)
			.name(null)
			.standard(null)
			.stock(null)
			.inboundPrice(null)
			.outboundPrice(null)
			.image(null)
			.createdAt(null)
			.build();
	}

	public static Product create(RegistProductRequest request) {
		return Product.builder()
			.companyId(request.companyId())
			.name(request.name())
			.standard(request.standard())
			.stock(request.stock())
			.inboundPrice(request.inboundPrice())
			.outboundPrice(request.outboundPrice())
			.image(request.image())
			.build();
	}

	public void update(ModifyProductRequest request) {
		if (request.name() != null) {
			this.name = request.name();
		}
		if (request.standard() != null) {
			this.standard = request.standard();
		}
		if (request.stock() != null) {
			this.stock = request.stock();
		}
		if (request.inboundPrice() != null) {
			this.inboundPrice = request.inboundPrice();
		}
		if (request.outboundPrice() != null) {
			this.outboundPrice = request.outboundPrice();
		}
		if (request.image() != null) {
			this.image = request.image();
		}
	}
}
