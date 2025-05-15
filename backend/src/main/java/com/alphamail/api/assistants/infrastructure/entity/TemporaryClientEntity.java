package com.alphamail.api.assistants.infrastructure.entity;

import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.common.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "temporary_schedule")
@Builder
public class TemporaryClientEntity extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@Column(name = "license_num", columnDefinition = "VARCHAR(255)")
	private String licenseNum;

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

	@Column(name = "email", columnDefinition = "VARCHAR(255)")
	private String email;

	@Column(name = "phone_number", columnDefinition = "VARCHAR(13)")
	private String phoneNumber;

	@Column(name = "business_license", columnDefinition = "VARCHAR(255)")
	private String businessLicense;

}
