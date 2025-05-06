package com.alphamail.api.organization.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.repository.CompanyRepository;
import com.alphamail.api.organization.infrastructure.mapping.CompanyMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CompanyRepositoryImpl implements CompanyRepository {

	private final CompanyJpaRepository companyJpaRepository;
	private final CompanyMapper companyMapper;

	@Override
	public Company findById(Integer id) {
		return companyJpaRepository.findById(id)
			.map(companyMapper::toDomain)
			.orElse(null);
	}
}
