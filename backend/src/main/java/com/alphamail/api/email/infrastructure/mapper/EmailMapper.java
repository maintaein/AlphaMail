package com.alphamail.api.email.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.infrastructure.entity.EmailEntity;

@Mapper(componentModel = "spring")
public interface EmailMapper {

	@Mapping(source = "emailId", target = "id", qualifiedByName = "integerToEmailId")
	Email toDomain(EmailEntity emailEntity);

	@Mapping(source = "id", target = "emailId", qualifiedByName = "emailIdToInteger")
	EmailEntity toEntity(Email email);

	@Named("integerToEmailId")
	default Integer integerToEmailId(Integer id) {
		return id;
	}

	@Named("emailIdToInteger")
	default Integer emailIdToInteger(Integer emailId) {
		return emailId;
	}
}
