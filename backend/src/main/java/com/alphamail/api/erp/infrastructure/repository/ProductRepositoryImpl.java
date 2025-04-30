package com.alphamail.api.erp.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.Product;
import com.alphamail.api.erp.domain.repository.ProductRepository;
import com.alphamail.api.erp.infrastructure.entity.ProductEntity;
import com.alphamail.api.erp.infrastructure.mapping.ProductMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepository {

	private final ProductJpaRepository productJpaRepository;
	private final ProductMapper productMapper;

	@Override
	public Product duplicateProduct(Integer companyId, String name, String standard) {
		Optional<ProductEntity> existProduct = productJpaRepository.findByCompanyIdAndNameAndStandard(companyId, name, standard);

		return productMapper.toDomain(existProduct);
	}

	@Override
	public Product save(Product product) {
		ProductEntity productEntity = productMapper.toEntity(product);
		ProductEntity savedProductEntity = productJpaRepository.save(productEntity);

		return productMapper.toDomain(savedProductEntity);
	}
}
