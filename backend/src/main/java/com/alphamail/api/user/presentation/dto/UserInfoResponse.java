package com.alphamail.api.user.presentation.dto;

import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.valueobject.UserInfo;

public record UserInfoResponse(
	Integer id,
	String position,
	String name,
	String email,
	String phoneNum,
	String image,
	Integer groupId,
	String groupName,
	Integer companyId,
	String companyName
	) {
	public static UserInfoResponse from(User user, Group group, Company company) {
		return new UserInfoResponse(user.getId().getValue(),
			user.getPosition(),
			user.getName(),
			user.getEmail(),
			user.getPhoneNum(),
			user.getImage(),
			group.getGroupId(),
			group.getName(),
			company.getCompanyId(),
			company.getName());
	}

	public static UserInfoResponse from(UserInfo userInfo) {
		return from(
			userInfo.getUser(),
			userInfo.getGroup(),
			userInfo.getCompany()
		);
	}
}
