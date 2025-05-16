package com.alphamail.api.assistants.infrastructure.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.assistants.domain.entity.EmailTemplateField;
import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateFieldEntity;

@Mapper(componentModel = "spring")
public interface EmailTemplateFieldMapper {

	@Mapping(target = "template", ignore = true)
	EmailTemplateFieldEntity toEntity(EmailTemplateField domain);

	@Mapping(source = "template.id", target = "templateId")
	EmailTemplateField toDomain(EmailTemplateFieldEntity entity);

	List<EmailTemplateField> toDomainList(List<EmailTemplateFieldEntity> entities);
}
