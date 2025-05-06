package com.alphamail.api.organization.domain.repository;

import com.alphamail.api.organization.domain.entity.Company;

public interface CompanyRepository {

	Company findById(Integer id);
}
