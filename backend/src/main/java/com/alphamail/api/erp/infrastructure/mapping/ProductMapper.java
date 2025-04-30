package com.alphamail.api.erp.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.erp.domain.entity.Product;
import com.alphamail.api.erp.infrastructure.entity.ProductEntity;

@Mapper(componentModel = "spring")
public interface ProductMapper {

	@Mapping(source = "productId", target = "id")
	ProductEntity toEntity(Product product);

	@Mapping(source = "id", target = "productId")
	Product toDomain(ProductEntity productEntity);
}
