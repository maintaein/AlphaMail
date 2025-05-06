package com.alphamail.api.erp.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.erp.domain.entity.QuoteProduct;
import com.alphamail.api.erp.infrastructure.entity.QuoteProductEntity;

@Mapper(componentModel = "spring", uses = { ProductMapper.class })
public interface QuoteProductMapper {

	@Mapping(source = "product", target = "productEntity")
	@Mapping(source = "quoteProductId", target = "id")
	@Mapping(target = "quoteEntity", ignore = true)
	QuoteProductEntity toEntity(QuoteProduct domain);

	@Mapping(source = "productEntity", target = "product")
	@Mapping(source = "id", target = "quoteProductId")
	QuoteProduct toDomain(QuoteProductEntity entity);
}
