package com.alphamail.api.erp.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.erp.domain.entity.PurchaseOrderProduct;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderProductEntity;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface PurchaseOrderProductMapper {

	@Mapping(source = "product", target = "productEntity")
	PurchaseOrderProductEntity toEntity(PurchaseOrderProduct purchaseOrderProduct);

	@Mapping(source = "productEntity", target = "product")
	PurchaseOrderProduct toDomain(PurchaseOrderProductEntity purchaseOrderProductEntity);
}
