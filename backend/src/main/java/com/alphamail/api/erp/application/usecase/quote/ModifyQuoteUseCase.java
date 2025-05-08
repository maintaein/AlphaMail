package com.alphamail.api.erp.application.usecase.quote;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.domain.entity.Quote;
import com.alphamail.api.erp.domain.repository.QuoteRepository;
import com.alphamail.api.erp.domain.service.ClientReader;
import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.erp.domain.service.UserReader;
import com.alphamail.api.erp.presentation.dto.quote.RegistQuoteRequest;
import com.alphamail.api.organization.domain.entity.Client;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ModifyQuoteUseCase {

	private final QuoteRepository quoteRepository;
	private final UserReader userReader;
	private final GroupReader groupReader;
	private final ClientReader clientReader;

	public RegistResultDto execute(Integer quoteId, RegistQuoteRequest request) {
		Quote quote = quoteRepository.findById(quoteId).orElse(null);

		if (quote == null) {
			return RegistResultDto.notFound();
		} else if (quote.getDeletedAt() != null) {
			return RegistResultDto.notFound();
		}

		if (request.userId() != null && !request.userId().equals(quote.getUser().getId().getValue())) {
			User newUser = userReader.findById(request.userId());

			if (newUser == null) {
				return RegistResultDto.badRequest();
			}
			quote.updateUser(newUser);
		}

		if (request.groupId() != null && !request.groupId().equals(quote.getGroup().getGroupId())) {
			Group newGroup = groupReader.findById(request.groupId());

			if (newGroup == null) {
				return RegistResultDto.badRequest();
			}
			quote.updateGroup(newGroup);
		}

		if (request.clientId() != null && !request.clientId().equals(quote.getClient().getClientId())) {
			Client newClient = clientReader.findById(request.clientId());

			if (newClient == null) {
				return RegistResultDto.badRequest();
			}
			quote.updateClient(newClient);
		}

		quote.update(request);
		Quote savedQuote = quoteRepository.save(quote);

		if (savedQuote == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedQuote.getQuoteId());
	}
}
