package com.alphamail.api.erp.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;
import com.alphamail.api.organization.infrastructure.mapping.CompanyMapper;
import com.alphamail.api.organization.infrastructure.mapping.GroupMapper;
import com.alphamail.api.user.infrastructure.mapping.UserMapper;

@Mapper(componentModel = "spring", uses = {
	PurchaseOrderProductMapper.class,
	UserMapper.class,
	ClientMapper.class,
	GroupMapper.class,
	CompanyMapper.class
})
public interface PurchaseOrderMapper {

	@Mapping(source = "user", target = "userEntity")
	@Mapping(source = "client", target = "clientEntity")
	@Mapping(source = "company", target = "companyEntity")
	@Mapping(source = "group", target = "groupEntity")
	@Mapping(source = "purchaseOrderProducts", target = "products")
	@Mapping(source = "purchaseOrderId", target = "id")
	PurchaseOrderEntity toEntity(PurchaseOrder purchaseOrder);

	@Mapping(source = "userEntity", target = "user")
	@Mapping(source = "clientEntity", target = "client")
	@Mapping(source = "companyEntity", target = "company")
	@Mapping(source = "groupEntity", target = "group")
	@Mapping(source = "products", target = "purchaseOrderProducts")
	@Mapping(source = "id", target = "purchaseOrderId")
	PurchaseOrder toDomain(PurchaseOrderEntity purchaseOrderEntity);
}
