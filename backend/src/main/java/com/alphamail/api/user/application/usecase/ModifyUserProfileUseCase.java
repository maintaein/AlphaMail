package com.alphamail.api.user.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.repository.UserRepository;
import com.alphamail.api.user.presentation.dto.ModifyUserProfileRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ModifyUserProfileUseCase {

	private final UserRepository userRepository;

	public boolean execute(Integer userId, ModifyUserProfileRequest request) {
		User user = userRepository.findById(userId);

		if (user == null) {
			return false;
		}

		user.updateProfile(request.phoneNum(), request.image());
		userRepository.save(user);

		return true;
	}
}
