package com.alphamail.api.assistants.domain.entity;

import com.alphamail.api.assistants.presentation.dto.client.UpdateTemporaryClientRequest;
import com.alphamail.api.assistants.presentation.dto.client.TemporaryClientRequest;
import com.alphamail.api.email.domain.entity.Email;

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

	private String title;

	private Email email;

	private Integer userId;

	private String licenseNum;

	private String address;

	private String corpName;

	private String representative;

	private String businessType;

	private String businessItem;

	private String clientEmail;

	private String phoneNumber;

	private String businessLicense;

	// 정적 팩토리 메서드 추가
	public static TemporaryClient from(TemporaryClientRequest request, Integer userId, Email email) {
		return TemporaryClient.builder()
			.userId(userId)
			.title(request.corpName() + "의 임시 거래처 작성서")
			.licenseNum(request.licenseNum())
			.address(request.address())
			.corpName(request.corpName())
			.representative(request.representative())
			.businessType(request.businessType())
			.businessItem(request.businessItem())
			.phoneNumber(null)
			.businessLicense(request.businessLicense())
			.email(email)
			.clientEmail(request.email())
			.build();
	}

	// 업데이트 용 정적 팩토리 메서드 추가 (record 형식에 맞게 수정)
	public static TemporaryClient update(UpdateTemporaryClientRequest request, TemporaryClient existingClient) {
		return TemporaryClient.builder()
			.id(existingClient.getId())
			.userId(existingClient.getUserId())
			.clientEmail(request.email())
			.title(existingClient.title)
			.licenseNum(request.licenseNum())
			.address(request.address())
			.corpName(request.corpName())
			.representative(request.representative())
			.businessType(request.businessType())
			.businessItem(request.businessItem())
			.email(existingClient.email)
			.phoneNumber(request.phoneNumber())
			.businessLicense(request.businessLicense())
			.build();
	}

}
