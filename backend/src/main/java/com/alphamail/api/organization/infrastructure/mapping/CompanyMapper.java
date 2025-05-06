package com.alphamail.api.organization.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.infrastructure.entity.CompanyEntity;

@Mapper(componentModel = "spring")
public interface CompanyMapper {

	@Mapping(source = "companyId", target = "id")
	CompanyEntity toEntity(Company company);

	@Mapping(source = "id", target = "companyId")
	Company toDomain(CompanyEntity entity);
}
