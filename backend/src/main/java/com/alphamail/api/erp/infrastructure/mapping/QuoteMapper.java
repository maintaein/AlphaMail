package com.alphamail.api.erp.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.erp.domain.entity.Quote;
import com.alphamail.api.erp.infrastructure.entity.QuoteEntity;
import com.alphamail.api.organization.infrastructure.mapping.ClientMapper;
import com.alphamail.api.organization.infrastructure.mapping.CompanyMapper;
import com.alphamail.api.organization.infrastructure.mapping.GroupMapper;
import com.alphamail.api.user.infrastructure.mapping.UserMapper;

@Mapper(componentModel = "spring", uses = {
	UserMapper.class,
	ClientMapper.class,
	CompanyMapper.class,
	GroupMapper.class,
	QuoteProductMapper.class
})
public interface QuoteMapper {

	@Mapping(source = "user", target = "userEntity")
	@Mapping(source = "client", target = "clientEntity")
	@Mapping(source = "company", target = "companyEntity")
	@Mapping(source = "group", target = "groupEntity")
	@Mapping(source = "quoteProducts", target = "quoteProducts")
	@Mapping(source = "quoteId", target = "id")
	QuoteEntity toEntity(Quote domain);

	@Mapping(source = "userEntity", target = "user")
	@Mapping(source = "clientEntity", target = "client")
	@Mapping(source = "companyEntity", target = "company")
	@Mapping(source = "groupEntity", target = "group")
	@Mapping(source = "quoteProducts", target = "quoteProducts")
	@Mapping(source = "id", target = "quoteId")
	Quote toDomain(QuoteEntity entity);
}
