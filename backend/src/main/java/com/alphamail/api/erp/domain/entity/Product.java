package com.alphamail.api.erp.domain.entity;

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
	private final Integer productId;  // 품목 아이디
	private Integer companyId;  // FK (companies.id)
	private String name;  // 재고 이름
	private String standard;  // 규격
	private Integer stock = 0;  // 재고 수량 (기본값 0)
	private Long inboundPrice;  // 입고 단가
	private Long outboundPrice;  // 출고 단가
	private String image;  // 이미지 URL (nullable)

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
