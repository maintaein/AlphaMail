package com.alphamail.api.user.domain.repository;

import com.alphamail.api.user.domain.User;

public interface UserRepository {

    User save(User user);
}
