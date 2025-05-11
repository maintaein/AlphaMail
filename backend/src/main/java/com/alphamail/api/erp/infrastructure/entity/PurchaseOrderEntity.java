package com.alphamail.api.erp.infrastructure.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.organization.infrastructure.entity.CompanyEntity;
import com.alphamail.api.organization.infrastructure.entity.GroupEntity;
import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.common.entity.BaseTimeEntity;

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
public class PurchaseOrderEntity extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;  // 발주서 아이디

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity userEntity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id", nullable = false)
	private CompanyEntity companyEntity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_id", nullable = false)
	private GroupEntity groupEntity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id", nullable = false)
	private ClientEntity clientEntity;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

	@Column(name = "deliver_at", nullable = false)
	private LocalDateTime deliverAt;

	@Column(name = "order_no", nullable = false, length = 255)
	private String orderNo;

	@Column(name = "shipping_address", length = 255)
	private String shippingAddress;

	@Column(name = "manager", length = 30)
	private String manager;

	@Column(name = "manager_number", length = 13)
	private String managerNumber;

	@Column(name = "payment_term", length = 255)
	private String paymentTerm;

	@Setter
	@OneToMany(mappedBy = "purchaseOrderEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PurchaseOrderProductEntity> products;
}
