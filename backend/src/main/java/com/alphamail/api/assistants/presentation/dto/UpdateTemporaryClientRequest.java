package com.alphamail.api.assistants.presentation.dto;

import com.alphamail.api.erp.presentation.dto.client.RegistClientRequest;

public record UpdateTemporaryClientRequest(
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
}

