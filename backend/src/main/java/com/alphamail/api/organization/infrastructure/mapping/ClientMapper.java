package com.alphamail.api.organization.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.organization.domain.entity.Client;
import com.alphamail.api.organization.infrastructure.entity.ClientEntity;

@Mapper(componentModel = "spring")
public interface ClientMapper {

	@Mapping(source = "id", target = "clientId")
	Client toDomain(ClientEntity clientEntity);

	@Mapping(source = "clientId", target = "id")
	ClientEntity toEntity(Client client);
}
