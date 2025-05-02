package com.alphamail.api.erp.infrastructure.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "purchase_orders")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PurchaseOrderEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;  // 발주서 아이디

	@Column(nullable = false)
	private Integer userId;  // FK (users.id)

	@Column(nullable = false)
	private Integer groupId;  // FK (groups.id)

	@Column(nullable = false)
	private Integer clientId;  // FK (clients.id)

	@Column(nullable = false)
	private LocalDateTime deliverAt;

	@Column(nullable = false, length = 255)
	private String orderNo;  // 발주번호
}
