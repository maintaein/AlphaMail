package com.alphamail.api.erp.presentation.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OcrResponse {
	private String corpName;
	private String representative;
	private String licenseNum;
	private String businessType;
	private String businessItem;
	private String address;

	// 필요한 경우 생성자 및 추가 메서드
}