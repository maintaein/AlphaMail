package com.alphamail.api.assistants.presentation.dto;

public record TemporaryClientRequest(
	Integer id,
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
