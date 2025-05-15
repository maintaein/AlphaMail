package com.alphamail.api.assistants.presentation.dto.client;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TemporaryClientResponse {

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

	// 도메인 객체로부터 응답 객체를 생성하는 정적 팩토리 메서드
	public static TemporaryClientResponse from(TemporaryClient temporaryClient) {
		return TemporaryClientResponse.builder()
			.id(temporaryClient.getId())
			.userId(temporaryClient.getUserId())
			.licenseNum(temporaryClient.getLicenseNum())
			.address(temporaryClient.getAddress())
			.corpName(temporaryClient.getCorpName())
			.representative(temporaryClient.getRepresentative())
			.businessType(temporaryClient.getBusinessType())
			.businessItem(temporaryClient.getBusinessItem())
			.email(temporaryClient.getClientEmail())
			.phoneNumber(temporaryClient.getPhoneNumber())
			.businessLicense(temporaryClient.getBusinessLicense())
			.build();
	}
}