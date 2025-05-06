package com.alphamail.api.erp.infrastructure.adapter;

import org.springframework.stereotype.Component;

import com.alphamail.api.erp.domain.service.CompanyReader;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.repository.CompanyRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CompanyReaderImpl implements CompanyReader {

	private final CompanyRepository companyRepository;

	@Override
	public Company findById(Integer companyId) {
		return companyRepository.findById(companyId);
	}
}
