package com.alphamail.api.erp.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.alphamail.api.erp.domain.entity.Quote;
import com.alphamail.api.erp.presentation.dto.quote.QuoteSearchCondition;
import com.alphamail.api.organization.domain.entity.Company;

public interface QuoteRepository {

	Page<Quote> findAllByCondition(Company company, QuoteSearchCondition condition, Pageable pageable);

	Optional<Quote> findById(Integer quoteId);

	Quote save(Quote quote);

	void deleteAllByIds(List<Integer> quoteIds);

	void softDeleteById(Integer quoteId);
}
