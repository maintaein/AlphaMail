package com.alphamail.api.erp.infrastructure.adapter;

import org.springframework.stereotype.Component;

import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.organization.domain.repository.GroupRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GroupReaderImpl implements GroupReader {

	private final GroupRepository groupRepository;

	@Override
	public Group findById(Integer groupId) {
		return groupRepository.findById(groupId);
	}
}
