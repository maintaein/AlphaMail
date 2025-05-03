package com.alphamail.api.erp.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;
import com.alphamail.api.user.infrastructure.mapping.UserMapper;

@Mapper(componentModel = "spring", uses = {PurchaseOrderProductMapper.class, UserMapper.class})
public interface PurchaseOrderMapper {

	@Mapping(source = "user", target = "userEntity")
	@Mapping(source = "purchaseOrderProducts", target = "products")
	PurchaseOrderEntity toEntity(PurchaseOrder purchaseOrder);

	@Mapping(source = "userEntity", target = "user")
	@Mapping(source = "products", target = "purchaseOrderProducts")
	@Mapping(source = "id", target = "purchaseOrderId")
	PurchaseOrder toDomain(PurchaseOrderEntity purchaseOrderEntity);
}
