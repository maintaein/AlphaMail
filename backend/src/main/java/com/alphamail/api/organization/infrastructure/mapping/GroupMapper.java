package com.alphamail.api.organization.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.organization.infrastructure.entity.GroupEntity;

@Mapper(componentModel = "spring", uses = { CompanyMapper.class })
public interface GroupMapper {

	@Mapping(source = "id", target = "groupId")
	@Mapping(source = "companyEntity", target = "company")
	Group toDomain(GroupEntity groupEntity);

	@Mapping(source = "groupId", target = "id")
	@Mapping(source = "company", target = "companyEntity")
	GroupEntity toEntity(Group group);
}
