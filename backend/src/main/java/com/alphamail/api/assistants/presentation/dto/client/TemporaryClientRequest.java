package com.alphamail.api.assistants.presentation.dto.client;

public record TemporaryClientRequest(
	String licenseNum,
	String address,
	String corpName,
	String representative,
	String businessType,
	String businessItem,
	//상대방 이메일
	String email,
	String phoneNumber,
	// s3에 등록될 사진
	String businessLicense,
	String receivedEmail,
	Integer emailId

) {
}
