package com.alphamail.api.organization.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Client {

	private Integer clientId;

	private String licenseNum;

	private String address;

	private String corpName;

	private String representative;

	private String businessType;

	private String businessItem;

	private String email;

	private String phoneNum;

	private String businessLicense;

	private Company company;

	private Group group;
}
