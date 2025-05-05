package com.alphamail.api.erp.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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

	public static PurchaseOrder create(RegistPurchaseOrderRequest request, User user) {
		return PurchaseOrder.builder()
			.user(user)
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
						.product(Product.of(p.productId()))
						.count(p.count())
						.price(p.price())
						.build())
					.toList()
			)
			.build();
	}

	public void updateUser(User user) {
		this.user = user;
	}

	public void update(RegistPurchaseOrderRequest request) {
		if (request.groupId() != null) {
			this.groupId = request.groupId();
		}
		if (request.clientId() != null) {
			this.clientId = request.clientId();
		}
		if (request.orderNo() != null) {
			this.orderNo = request.orderNo();
		}
		if (request.deliverAt() != null) {
			this.deliverAt = request.deliverAt();
		}

		// 기존 품목 매핑 (기존 ID → 객체)
		Map<Integer, PurchaseOrderProduct> existingMap = this.purchaseOrderProducts.stream()
			.filter(p -> p.getPurchaseOrderProductId() != null)
			.collect(Collectors.toMap(PurchaseOrderProduct::getPurchaseOrderProductId, p -> p));

		List<PurchaseOrderProduct> updatedProducts = new ArrayList<>();

		// 수정/추가
		for (RegistPurchaseOrderRequest.ProductInfo info : request.products()) {

			if (info.purchaseOrderProductId() != null && existingMap.containsKey(info.purchaseOrderProductId())) {
				PurchaseOrderProduct existing = existingMap.get(info.purchaseOrderProductId());
				existing.update(info.count(), info.price(), Product.of(info.productId()));
				updatedProducts.add(existing);
			} else {
				PurchaseOrderProduct newProduct = PurchaseOrderProduct.builder()
					.purchaseOrderProductId(null)
					.product(Product.of(info.productId()))
					.count(info.count())
					.price(info.price())
					.build();
				updatedProducts.add(newProduct);
			}
		}

		Set<Integer> requestIds = request.products().stream()
			.map(RegistPurchaseOrderRequest.ProductInfo::purchaseOrderProductId)
			.filter(Objects::nonNull)
			.collect(Collectors.toSet());

		// 삭제할 품목 제거
		this.purchaseOrderProducts.removeIf(p ->
			p.getPurchaseOrderProductId() != null && !requestIds.contains(p.getPurchaseOrderProductId())
		);

		this.purchaseOrderProducts.clear();
		this.purchaseOrderProducts.addAll(updatedProducts);

		this.updatedAt = LocalDateTime.now();
	}

	public void softDelete() {
		this.deletedAt = LocalDateTime.now();
	}

	private static String generateOrderNo() {
		String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		String randomPart = UUID.randomUUID().toString().substring(0, 6);
		return datePart + "-" + randomPart;
	}
}
