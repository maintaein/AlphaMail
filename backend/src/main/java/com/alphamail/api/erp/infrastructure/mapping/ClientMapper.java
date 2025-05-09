package com.alphamail.api.erp.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.infrastructure.entity.ClientEntity;
import com.alphamail.api.organization.infrastructure.mapping.CompanyMapper;
import com.alphamail.api.organization.infrastructure.mapping.GroupMapper;

@Mapper(componentModel = "spring", uses = {
	CompanyMapper.class,
	GroupMapper.class
})
public interface ClientMapper {

	@Mapping(source = "id", target = "clientId")
	@Mapping(source = "companyEntity", target = "company")
	@Mapping(source = "groupEntity", target = "group")
	Client toDomain(ClientEntity clientEntity);

	@Mapping(source = "clientId", target = "id")
	@Mapping(source = "company", target = "companyEntity")
	@Mapping(source = "group", target = "groupEntity")
	ClientEntity toEntity(Client client);
}
