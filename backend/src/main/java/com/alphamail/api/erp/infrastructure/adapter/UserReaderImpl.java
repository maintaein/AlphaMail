package com.alphamail.api.erp.infrastructure.adapter;

import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;
import org.springframework.stereotype.Component;

import com.alphamail.api.erp.domain.service.UserReader;
import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserReaderImpl implements UserReader {

	private final UserRepository userRepository;

	@Override
	public User findById(Integer id) {
		return userRepository.findById(id);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));
	}
}
