package com.alphamail.api.assistants.domain.entity;

import com.alphamail.api.assistants.presentation.dto.TemporaryClientRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TemporaryClient {

	private Integer id;

	private Integer userId;

	private String licenseNum;

	private String address;

	private String corpName;

	private String representative;

	private String businessType;

	private String businessItem;

	private String email;

	private String phoneNumber;

	private String businessLicense;

	// 정적 팩토리 메서드 추가
	public static TemporaryClient from(TemporaryClientRequest request, Integer userId) {
		return TemporaryClient.builder()
			.userId(userId)
			.licenseNum(request.licenseNum())
			.address(request.address())
			.corpName(request.corpName())
			.representative(request.representative())
			.businessType(request.businessType())
			.businessItem(request.businessItem())
			.email(request.email())
			.phoneNumber(request.phoneNumber())
			.businessLicense(request.businessLicense())
			.build();
	}

}
