package com.alphamail.api.erp.domain.repository;

import com.alphamail.api.erp.domain.entity.Product;

public interface ProductRepository {

	Product duplicateProduct(Integer companyId, String name, String standard);

	Product save(Product product);
}
