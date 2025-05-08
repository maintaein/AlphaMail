package com.alphamail.api.erp.infrastructure.entity;

import java.time.LocalDateTime;

import com.alphamail.common.entity.BaseTimeEntity;

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
@Table(name = "products")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ProductEntity extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;  // 품목 아이디

	@Column(name = "company_id", nullable = false)
	private Integer companyId;  // FK (companies.id)

	@Column(nullable = false, length = 255)
	private String name;  // 재고 이름

	@Column(nullable = false, length = 50)
	private String standard;  // 규격

	@Builder.Default
	@Column(nullable = false)
	private Integer stock = 0;  // 재고 수량 (기본값 0)

	@Column(name = "inbound_price", nullable = false)
	private Long inboundPrice;  // 입고 단가

	@Column(name = "outbound_price", nullable = false)
	private Long outboundPrice;  // 출고 단가

	@Column(length = 255)
	private String image;  // 이미지 URL (nullable)

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;
}
