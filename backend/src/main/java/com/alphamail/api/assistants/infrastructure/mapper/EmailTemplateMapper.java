package com.alphamail.api.assistants.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;
import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateEntity;
import com.alphamail.common.mapper.EntityReferenceFinder;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class})
public interface EmailTemplateMapper {

	@Mapping(source = "userId", target = "user", qualifiedByName = "toUserEntity")
	EmailTemplateEntity toEntity(EmailTemplate domain);

	@Mapping(source = "user.id", target = "userId")
	EmailTemplate toDomain(EmailTemplateEntity entity);
}
