package com.alphamail.api.erp.application.usecase.quote;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.domain.entity.Quote;
import com.alphamail.api.erp.domain.repository.QuoteRepository;
import com.alphamail.api.erp.domain.service.ClientReader;
import com.alphamail.api.erp.domain.service.CompanyReader;
import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.erp.domain.service.UserReader;
import com.alphamail.api.erp.presentation.dto.quote.RegistQuoteRequest;
import com.alphamail.api.organization.domain.entity.Client;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistQuoteUseCase {

	private final QuoteRepository quoteRepository;
	private final UserReader userReader;
	private final CompanyReader companyReader;
	private final GroupReader groupReader;
	private final ClientReader clientReader;

	public RegistResultDto execute(RegistQuoteRequest request) {
		User user = userReader.findById(request.userId());
		Company company = companyReader.findById(request.companyId());
		Group group = groupReader.findById(request.groupId());
		Client client = clientReader.findById(request.clientId());

		if (user == null || company == null || group == null || client == null) {
			return RegistResultDto.badRequest();
		}
		Quote quote = Quote.create(request, user, company, group, client);
		Quote savedQuote = quoteRepository.save(quote);

		if (savedQuote == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedQuote.getQuoteId());
	}
}
