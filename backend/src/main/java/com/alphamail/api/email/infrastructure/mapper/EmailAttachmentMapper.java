package com.alphamail.api.email.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.infrastructure.entity.EmailAttachmentEntity;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class})
public interface EmailAttachmentMapper {

	EmailAttachment toDomain(EmailAttachmentEntity entity);

	EmailAttachmentEntity toEntity(EmailAttachment domain);

}
