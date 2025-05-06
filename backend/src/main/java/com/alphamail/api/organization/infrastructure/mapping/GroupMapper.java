package com.alphamail.api.organization.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.organization.infrastructure.entity.GroupEntity;

@Mapper(componentModel = "spring")
public interface GroupMapper {

	@Mapping(source = "id", target = "groupId")
	Group toDomain(GroupEntity groupEntity);

	@Mapping(source = "groupId", target = "id")
	GroupEntity toEntity(Group group);
}