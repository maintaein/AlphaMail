package com.alphamail.api.erp.application.usecase.quote;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.Quote;
import com.alphamail.api.erp.domain.repository.QuoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemoveQuoteUseCase {

	private final QuoteRepository quoteRepository;

	public boolean execute(Integer quoteId) {
		Quote quote = quoteRepository.findById(quoteId).orElse(null);
		if (quote == null) {
			return false;
		} else if (quote.getDeletedAt() != null) {
			return false;
		}

		quoteRepository.softDeleteById(quoteId);
		return true;
	}
}
