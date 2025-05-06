package com.alphamail.api.organization.domain.repository;

import com.alphamail.api.organization.domain.entity.Group;

public interface GroupRepository {

	Group findById(Integer id);
}
