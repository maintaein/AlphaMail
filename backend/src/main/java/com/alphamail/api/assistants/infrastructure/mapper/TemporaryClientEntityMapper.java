package com.alphamail.api.assistants.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryClientEntity;
import com.alphamail.common.mapper.EntityReferenceFinder;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class})
public interface TemporaryClientEntityMapper {

	@Mapping(source = "userId", target = "user", qualifiedByName = "toUserEntity")
	TemporaryClientEntity toEntity(TemporaryClient domain);

	// user.userId를 참조하도록 수정
	@Mapping(source = "user.userId", target = "userId")
	TemporaryClient toDomain(TemporaryClientEntity entity);
}