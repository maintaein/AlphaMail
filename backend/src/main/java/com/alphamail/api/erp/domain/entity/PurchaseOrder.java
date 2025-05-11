package com.alphamail.api.erp.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;

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
	private Company company;
	private Group group;
	private Client client;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;
	private LocalDateTime deliverAt;
	private String orderNo;
	private String shippingAddress;
	private String manager;
	private String managerNumber;
	private String paymentTerm;
	private List<PurchaseOrderProduct> purchaseOrderProducts;

	public static PurchaseOrder create(RegistPurchaseOrderRequest request, User user, Company company, Group group,
		Client client) {
		PurchaseOrder order = PurchaseOrder.builder()
			.user(user)
			.company(company)
			.group(group)
			.client(client)
			.orderNo(
				request.orderNo() != null ? request.orderNo() : generateOrderNo()
			)
			.deliverAt(request.deliverAt())
			.shippingAddress(request.shippingAddress())
			.manager(request.manager())
			.managerNumber(request.managerNumber())
			.paymentTerm(request.paymentTerm())
			.purchaseOrderProducts(new ArrayList<>())
			.build();

		List<PurchaseOrderProduct> products = request.products().stream()
			.map(p -> {
				PurchaseOrderProduct product = PurchaseOrderProduct.builder()
					.product(Product.of(p.productId()))
					.count(p.count())
					.price(p.price())
					.build();
				product.setPurchaseOrder(order);
				return product;
			})
			.toList();

		order.getPurchaseOrderProducts().addAll(products);
		return order;
	}

	public void updateUser(User user) {
		this.user = user;
	}

	public void updateGroup(Group group) {
		this.group = group;
	}

	public void updateClient(Client client) {
		this.client = client;
	}

	public void update(RegistPurchaseOrderRequest request) {
		if (request.orderNo() != null) {
			this.orderNo = request.orderNo();
		}
		if (request.deliverAt() != null) {
			this.deliverAt = request.deliverAt();
		}
		this.shippingAddress = request.shippingAddress();
		this.manager = request.manager();
		this.managerNumber = request.managerNumber();
		this.paymentTerm = request.paymentTerm();

		Map<Integer, PurchaseOrderProduct> existingMap = this.purchaseOrderProducts.stream()
			.filter(p -> p.getPurchaseOrderProductId() != null)
			.collect(Collectors.toMap(PurchaseOrderProduct::getPurchaseOrderProductId, p -> p));

		List<PurchaseOrderProduct> updatedProducts = new ArrayList<>();

		for (RegistPurchaseOrderRequest.PurchaseOrderProductDto info : request.products()) {

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
				newProduct.setPurchaseOrder(this);
				updatedProducts.add(newProduct);
			}
		}

		this.purchaseOrderProducts.clear();
		this.purchaseOrderProducts.addAll(updatedProducts);
	}

	private static String generateOrderNo() {
		String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		String randomPart = UUID.randomUUID().toString().substring(0, 6);
		return "PO-" + datePart + "-" + randomPart;
	}
}
