package com.alphamail.api.organization.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.organization.domain.repository.GroupRepository;
import com.alphamail.api.organization.infrastructure.mapping.GroupMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepository {

	private final GroupJpaRepository groupJpaRepository;
	private final GroupMapper groupMapper;

	@Override
	public Group findById(Integer id) {
		return groupJpaRepository.findById(id)
			.map(groupMapper::toDomain)
			.orElse(null);
	}
}
