package com.alphamail.api.assistants.infrastructure.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;
import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateEntity;
import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateFieldEntity;
import com.alphamail.common.mapper.EntityReferenceFinder;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class, EmailTemplateFieldMapper.class})
public interface EmailTemplateMapper {

	@Mapping(source = "userId", target = "user", qualifiedByName = "toUserEntity")
	EmailTemplateEntity toEntity(EmailTemplate domain);

	@Mapping(source = "entity.user.userId", target = "userId")
	@Mapping(source = "entity.id", target = "id")
	EmailTemplate toDomain(EmailTemplateEntity entity);

	@AfterMapping
	default void setTemplateForFields(@MappingTarget EmailTemplateEntity entity) {
		if (entity.getFields() != null) {
			for (EmailTemplateFieldEntity field : entity.getFields()) {
				field.setTemplate(entity);
			}
		}
	}
}
