package com.alphamail.api.erp.domain.entity;

import java.time.LocalDateTime;
import java.util.List;

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
}
