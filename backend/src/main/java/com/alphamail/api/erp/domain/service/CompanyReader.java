package com.alphamail.api.erp.domain.service;

import com.alphamail.api.organization.domain.entity.Company;

public interface CompanyReader {
	Company findById(Integer companyId);
}
