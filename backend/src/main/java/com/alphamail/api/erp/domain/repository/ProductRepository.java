package com.alphamail.api.erp.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.alphamail.api.erp.domain.entity.Product;

public interface ProductRepository {

	Page<Product> findByCompanyId(Integer companyId, Pageable pageable);

	Page<Product> findByCompanyIdAndNameContainingIgnoreCase(Integer companyId, String name, Pageable pageable);

	Optional<Product> findById(Integer productId);

	Optional<Product> duplicateProduct(Integer companyId, String name, String standard, Long inboundPrice);

	Product save(Product product);

	void deleteAllByIds(List<Integer> ids);

	void delete(Integer productId);
}
