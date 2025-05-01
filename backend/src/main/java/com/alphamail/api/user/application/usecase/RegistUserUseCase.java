package com.alphamail.api.user.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.repository.UserRepository;
import com.alphamail.api.user.presentation.dto.RegistUserRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistUserUseCase {

	private final UserRepository userRepository;

	@Transactional
	public boolean execute(RegistUserRequest request) {
		// 이메일 중복 검사도 추가 해야할 수도 있다 .

		//        if (userRepository.findByEmail(command.getEmail()).isPresent()) {
		//            throw new RuntimeException("이미 등록된 이메일입니다.");
		//        }

		User user = User.create(request);
		User savedUser = userRepository.save(user);
		return savedUser != null; // 저장 성공 여부를 반환
	}

}
