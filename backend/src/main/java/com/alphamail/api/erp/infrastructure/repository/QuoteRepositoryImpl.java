package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.Quote;
import com.alphamail.api.erp.domain.repository.QuoteRepository;
import com.alphamail.api.erp.infrastructure.entity.QuoteEntity;
import com.alphamail.api.erp.infrastructure.mapping.QuoteMapper;
import com.alphamail.api.erp.infrastructure.specification.QuoteSpecification;
import com.alphamail.api.erp.presentation.dto.quote.QuoteSearchCondition;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.infrastructure.entity.CompanyEntity;
import com.alphamail.api.organization.infrastructure.mapping.CompanyMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class QuoteRepositoryImpl implements QuoteRepository {

	private final QuoteJpaRepository quoteJpaRepository;
	private final QuoteMapper quoteMapper;
	private final CompanyMapper companyMapper;

	@Override
	public Page<Quote> findAllByCondition(Company company, QuoteSearchCondition condition, Pageable pageable) {
		CompanyEntity companyEntity = companyMapper.toEntity(company);

		Specification<QuoteEntity> spec = Specification
			.where(QuoteSpecification.notDeleted())
			.and(QuoteSpecification.hasClientName(condition.clientName()))
			.and(QuoteSpecification.hasUserName(condition.userName()))
			.and(QuoteSpecification.hasQuoteNo(condition.quoteNo()))
			.and(QuoteSpecification.hasProductName(condition.productName()))
			.and(QuoteSpecification.betweenDates(condition.startDate(), condition.endDate()));

		spec = spec.and((root, query, cb) -> cb.equal(root.get("companyEntity"), companyEntity));

		return quoteJpaRepository.findAll(spec, pageable)
			.map(quoteMapper::toDomain);
	}

	@Override
	public Optional<Quote> findById(Integer quoteId) {
		return quoteJpaRepository.findById(quoteId)
			.map(quoteMapper::toDomain);
	}

	@Override
	public Quote save(Quote quote) {
		QuoteEntity entity = quoteMapper.toEntity(quote);

		entity.setQuoteProducts(
			entity.getQuoteProducts().stream()
				.peek(product -> product.setQuoteEntity(entity))
				.collect(Collectors.toList())
		);

		QuoteEntity saved = quoteJpaRepository.save(entity);

		return quoteMapper.toDomain(saved);
	}

	@Override
	public void deleteAllByIds(List<Integer> quoteIds) {
		quoteJpaRepository.deleteAllByIds(quoteIds);
	}
}
