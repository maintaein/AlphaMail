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
@Table(name = "quotes")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuoteEntity extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "quote_no", nullable = false)
	private String quoteNo;

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

	@Setter
	@OneToMany(mappedBy = "quoteEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<QuoteProductEntity> quoteProducts;
}
