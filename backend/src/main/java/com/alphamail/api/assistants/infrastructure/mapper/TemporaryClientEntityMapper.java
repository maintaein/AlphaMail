package com.alphamail.api.assistants.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryClientEntity;
import com.alphamail.api.email.infrastructure.mapper.EmailMapper;
import com.alphamail.api.user.infrastructure.mapping.UserMapper;
import com.alphamail.common.mapper.EntityReferenceFinder;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class, EmailMapper.class})
public interface TemporaryClientEntityMapper {

	@Mapping(source = "userId", target = "user", qualifiedByName = "toUserEntity")
	@Mapping(source = "email", target = "emailEntity")
		// Email 도메인 객체를 EmailEntity로 매핑
	TemporaryClientEntity toEntity(TemporaryClient domain);

	// user.userId를 참조하도록 수정
	@Mapping(source = "user.userId", target = "userId")  // user.userId → user.id로 수정 (필드명에 따라)
	@Mapping(source = "emailEntity", target = "email")
	// EmailEntity를 Email 도메인 객체로 매핑
	TemporaryClient toDomain(TemporaryClientEntity entity);
}