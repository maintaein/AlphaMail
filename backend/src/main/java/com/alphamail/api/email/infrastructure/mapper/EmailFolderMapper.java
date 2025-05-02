package com.alphamail.api.email.infrastructure.mapper;

import org.mapstruct.Mapper;

import com.alphamail.api.email.domain.entity.EmailFolder;
import com.alphamail.api.email.infrastructure.entity.EmailFolderEntity;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class})
public interface EmailFolderMapper {
	EmailFolder toDomain(EmailFolderEntity folderEntity);
}
