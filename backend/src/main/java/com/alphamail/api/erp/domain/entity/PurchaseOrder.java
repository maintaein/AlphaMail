package com.alphamail.api.erp.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;
import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.valueobject.UserId;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PurchaseOrder {
	private Integer purchaseOrderId;
	private User user;
	private Integer groupId;
	private Integer clientId;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;
	private LocalDateTime deliverAt;
	private String orderNo;
	private List<PurchaseOrderProduct> purchaseOrderProducts;

	public static PurchaseOrder create(RegistPurchaseOrderRequest request) {
		return PurchaseOrder.builder()
			.user(User.of(request.userId()))
			.groupId(request.groupId())
			.clientId(request.clientId())
			.orderNo(
				request.orderNo() != null ? request.orderNo() : generateOrderNo()
			)
			.deliverAt(request.deliverAt())
			.createdAt(LocalDateTime.now())
			.purchaseOrderProducts(
				request.products().stream()
					.map(p -> PurchaseOrderProduct.builder()
						.product(Product.of(p.id()))
						.count(p.count())
						.price(p.price())
						.build())
					.toList()
			)
			.build();
	}

	private static String generateOrderNo() {
		String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		String randomPart = UUID.randomUUID().toString().substring(0, 6);
		return datePart + "-" + randomPart;
	}
}
