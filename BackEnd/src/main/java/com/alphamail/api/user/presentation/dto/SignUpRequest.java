package com.alphamail.api.user.presentation.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
public record SignUpRequest(
        String name,
        String email,
        // todo: groupId 지정 어떻게 할 것인가 고민을 해야합니다.
        Integer groupId,
        String password,
        String phoneNumber,
        String position,
        String imageUrl
){

}
