package com.alphamail.api.erp.application.usecase.quote;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.QuoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemoveAllQuotesUseCase {

	private final QuoteRepository quoteRepository;

	public boolean execute(List<Integer> quoteIds) {
		if (quoteIds == null || quoteIds.isEmpty()) {
			return false;
		}

		quoteRepository.deleteAllByIds(quoteIds);
		return true;
	}
}
