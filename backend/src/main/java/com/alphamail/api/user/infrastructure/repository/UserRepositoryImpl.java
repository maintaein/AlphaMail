package com.alphamail.api.user.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.alphamail.api.organization.infrastructure.mapping.CompanyMapper;
import com.alphamail.api.organization.infrastructure.mapping.GroupMapper;
import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.repository.UserRepository;
import com.alphamail.api.user.domain.valueobject.UserInfo;
import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.api.user.infrastructure.mapping.UserMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

	private final UserJpaRepository userJpaRepository;
	private final UserMapper userMapper;
	private final GroupMapper groupMapper;
	private final CompanyMapper companyMapper;

	@Override
	public Optional<User> findByEmail(String email) {
		return userJpaRepository.findByEmail(email)
			.map(userMapper::toDomain);
	}

	@Override
	public User findById(Integer id) {
		UserEntity userEntity = userJpaRepository.findById(id).orElse(null);

		return userEntity != null ? userMapper.toDomain(userEntity) : null;
	}

	@Override
	public User save(User user) {
		UserEntity userEntity = userMapper.toEntity(user);
		UserEntity savedUserEntity = userJpaRepository.save(userEntity);

		return userMapper.toDomain(savedUserEntity);
	}

	@Override
	public Optional<UserInfo> findUserInfoById(Integer userId) {
		return userJpaRepository.findByIdWithGroupAndCompany(userId)
			.map(entity -> new UserInfo(
			userMapper.toDomain(entity),
			groupMapper.toDomain(entity.getGroup()),
			companyMapper.toDomain(entity.getGroup().getCompanyEntity())
		));
	}
}
