package com.alphamail.api.erp.domain.service;

import com.alphamail.api.user.domain.entity.User;

public interface UserReader {
	User findById(Integer id);
}
