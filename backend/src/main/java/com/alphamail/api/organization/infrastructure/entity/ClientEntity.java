package com.alphamail.api.organization.infrastructure.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clients")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "license_num", nullable = false, length = 255)
	private String licenseNum;

	@Column(nullable = false, length = 255)
	private String address;

	@Column(name = "corp_name", nullable = false, length = 50)
	private String corpName;

	@Column(nullable = false, length = 10)
	private String representative;

	@Column(name = "business_type")
	private String businessType;

	@Column(name = "business_item")
	private String businessItem;

	@Column(length = 255)
	private String email;

	@Column(name = "phone_num", length = 13)
	private String phoneNum;

	@Column(name = "business_license", nullable = false, length = 255)
	private String businessLicense;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "company_id", nullable = false)
	private CompanyEntity companyEntity;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "group_id", nullable = false)
	private GroupEntity groupEntity;
}
