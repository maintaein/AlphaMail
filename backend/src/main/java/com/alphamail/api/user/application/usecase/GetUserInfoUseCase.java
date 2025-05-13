package com.alphamail.api.user.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.organization.domain.repository.CompanyRepository;
import com.alphamail.api.organization.domain.repository.GroupRepository;
import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.repository.UserRepository;
import com.alphamail.api.user.presentation.dto.UserInfoResponse;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetUserInfoUseCase {

	private final UserRepository userRepository;

	public UserInfoResponse execute(Integer userId) {

		return userRepository.findUserInfoById(userId)
			.map(UserInfoResponse::from)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));


	}
}
