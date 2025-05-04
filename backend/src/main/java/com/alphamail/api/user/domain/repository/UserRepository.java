package com.alphamail.api.user.domain.repository;

import com.alphamail.api.user.domain.entity.User;

public interface UserRepository {

	User findById(Integer id);

	User save(User user);
}
