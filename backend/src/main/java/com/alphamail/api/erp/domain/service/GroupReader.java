package com.alphamail.api.erp.domain.service;

import com.alphamail.api.organization.domain.entity.Group;

public interface GroupReader {
	Group findById(Integer groupId);
}
