package com.alphamail.api.erp.presentation.dto.client;

public record GetClientResponse(
	Integer id,
	String corpName,
	String representative,
	String licenseNum,
	String phoneNum,
	String email,
	String address,
	String businessType,
	String businessItem,
	String businessLicense
) {
}
