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

	// 엔티티를 도메인 객체로 변환
	@Mapping(source = "user.id", target = "userId")
	TemporaryClient toDomain(TemporaryClientEntity entity);
}