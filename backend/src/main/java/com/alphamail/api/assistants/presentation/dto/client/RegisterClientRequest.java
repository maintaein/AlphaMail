package com.alphamail.api.assistants.presentation.dto.client;

import com.alphamail.api.erp.presentation.dto.client.RegistClientRequest;

public record RegisterClientRequest(
	Integer TemporaryClientId,
	Integer companyId,
	Integer groupId,
	String licenseNum,
	String address,
	String corpName,
	String representative,
	String businessType,
	String businessItem,
	String email,
	String phoneNumber,
	String businessLicense
) {
	/**
	 * 현재 객체로부터 RegistClientRequest 객체를 생성합니다.
	 *
	 * @return 변환된 RegistClientRequest 객체
	 */
	public RegistClientRequest toRegistClientRequest() {
		return new RegistClientRequest(
			this.companyId,
			this.groupId,
			this.licenseNum,
			this.address,
			this.corpName,
			this.representative,
			this.businessType,
			this.businessItem,
			this.email,
			this.phoneNumber, // phoneNumber를 phoneNum으로 매핑
			this.businessLicense
		);
	}
}
