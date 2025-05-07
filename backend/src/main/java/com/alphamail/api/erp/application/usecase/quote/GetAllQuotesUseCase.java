package com.alphamail.api.erp.application.usecase.quote;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.QuoteRepository;
import com.alphamail.api.erp.domain.service.CompanyReader;
import com.alphamail.api.erp.presentation.dto.quote.GetAllQuotesResponse;
import com.alphamail.api.erp.presentation.dto.quote.QuoteSearchCondition;
import com.alphamail.api.global.dto.GetPageResponse;
import com.alphamail.api.organization.domain.entity.Company;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class GetAllQuotesUseCase {

	private final QuoteRepository quoteRepository;
	private final CompanyReader companyReader;

	public GetPageResponse<GetAllQuotesResponse> execute(Integer companyId,
		QuoteSearchCondition condition, Pageable pageable) {
		Company company = companyReader.findById(companyId);

		if (company == null) {
			return null;
		}

		Page<GetAllQuotesResponse> page = quoteRepository.findAllByCondition(company, condition,
			pageable)
			.map(GetAllQuotesResponse::from);
		return GetPageResponse.from(page);
	}
}
