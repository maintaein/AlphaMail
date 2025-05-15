package com.alphamail.api.assistants.infrastructure.entity;

import com.alphamail.api.email.infrastructure.entity.EmailEntity;
import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.common.entity.BaseTimeEntity;
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
@Getter
@NoArgsConstructor  // JPA 필수
@AllArgsConstructor // Builder 패턴에 필요
@Table(name = "temporary_client")
@Builder
public class TemporaryClientEntity extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "email_id", nullable = false)
	private EmailEntity emailEntity;

	@Column(name = "license_num", columnDefinition = "VARCHAR(255)")
	private String licenseNum;

	@Column(name = "title", length = 255, nullable = false)
	private String title;

	@Column(name = "address", columnDefinition = "VARCHAR(255)")
	private String address;

	@Column(name = "corp_name", columnDefinition = "VARCHAR(50)")
	private String corpName;

	@Column(name = "representative", columnDefinition = "VARCHAR(10)")
	private String representative;

	@Column(name = "business_type", columnDefinition = "VARCHAR(255)")
	private String businessType;

	@Column(name = "business_item", columnDefinition = "VARCHAR(255)")
	private String businessItem;

	@Column(name = "clientEmail", columnDefinition = "VARCHAR(255)")
	private String clientEmail;

	@Column(name = "phone_number", columnDefinition = "VARCHAR(13)")
	private String phoneNumber;

	@Column(name = "business_license", columnDefinition = "VARCHAR(255)")
	private String businessLicense;

}
