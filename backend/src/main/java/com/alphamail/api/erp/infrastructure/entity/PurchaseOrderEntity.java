package com.alphamail.api.erp.infrastructure.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.user.infrastructure.entity.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "purchase_orders")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrderEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;  // 발주서 아이디

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity userEntity;

	@Column(name = "group_id", nullable = false)
	private Integer groupId;

	@Column(name = "client_id", nullable = false)
	private Integer clientId;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

	@Column(name = "deliver_at", nullable = false)
	private LocalDateTime deliverAt;

	@Column(name = "order_no", nullable = false, length = 255)
	private String orderNo;

	@Setter
	@OneToMany(mappedBy = "purchaseOrderEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PurchaseOrderProductEntity> products;
}
