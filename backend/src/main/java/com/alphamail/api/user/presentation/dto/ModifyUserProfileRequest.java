package com.alphamail.api.user.presentation.dto;

public record ModifyUserProfileRequest(
	String phoneNum,
	String image
) {
}
