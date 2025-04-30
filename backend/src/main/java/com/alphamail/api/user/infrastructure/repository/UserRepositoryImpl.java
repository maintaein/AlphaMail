package com.alphamail.api.user.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.repository.UserRepository;
import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.api.user.infrastructure.mapping.UserMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

	private final UserJpaRepository userJpaRepository;
	private final UserMapper userMapper;

	@Override
	public User save(User user) {
		UserEntity userEntity = userMapper.toEntity(user);
		UserEntity savedUserEntity = userJpaRepository.save(userEntity);

		return userMapper.toDomain(savedUserEntity);
	}
}
