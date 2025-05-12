package com.alphamail.api.user.domain.repository;

import java.util.Optional;

import com.alphamail.api.user.domain.entity.User;
import com.alphamail.api.user.domain.valueobject.UserInfo;

public interface UserRepository {

	Optional<User> findByEmail(String email);

	User findById(Integer id);

	User save(User user);

	Optional<UserInfo> findUserInfoById(Integer userId);
}
