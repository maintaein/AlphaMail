package com.alphamail.api.user.presentation.dto;

import lombok.Builder;

@Builder
public record RegistUserRequest(
	// todo: groupId 지정 어떻게 할 것인가 고민을 해야합니다.
	Integer groupId,
	String position,
	String name,
	String email,
	String password,
	String phoneNum,
	String image
) {

}
