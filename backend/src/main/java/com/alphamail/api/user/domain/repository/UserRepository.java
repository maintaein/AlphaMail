package com.alphamail.api.user.domain.repository;

import com.alphamail.api.user.domain.entity.User;

public interface UserRepository {

	com.alphamail.api.user.domain.entity.User save(User user);
}
