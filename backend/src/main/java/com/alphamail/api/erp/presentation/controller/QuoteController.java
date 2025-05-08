package com.alphamail.api.erp.presentation.controller;

import java.time.LocalDateTime;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.application.usecase.quote.GetAllQuotesUseCase;
import com.alphamail.api.erp.application.usecase.quote.GetQuoteUseCase;
import com.alphamail.api.erp.application.usecase.quote.ModifyQuoteUseCase;
import com.alphamail.api.erp.application.usecase.quote.RegistQuoteUseCase;
import com.alphamail.api.erp.application.usecase.quote.RemoveAllQuotesUseCase;
import com.alphamail.api.erp.application.usecase.quote.RemoveQuoteUseCase;
import com.alphamail.api.erp.presentation.dto.quote.GetAllQuotesResponse;
import com.alphamail.api.erp.presentation.dto.quote.GetQuoteResponse;
import com.alphamail.api.erp.presentation.dto.quote.QuoteSearchCondition;
import com.alphamail.api.erp.presentation.dto.quote.RegistQuoteRequest;
import com.alphamail.api.global.dto.GetPageResponse;
import com.alphamail.api.global.dto.RegistErpResponse;
import com.alphamail.api.global.dto.RemoveAllErpRequest;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.ERP_BASE_API)
public class QuoteController {

	private final GetAllQuotesUseCase getAllQuotesUseCase;
	private final GetQuoteUseCase getQuoteUseCase;
	private final RegistQuoteUseCase registQuoteUseCase;
	private final ModifyQuoteUseCase modifyQuoteUseCase;
	private final RemoveAllQuotesUseCase removeAllQuotesUseCase;
	private final RemoveQuoteUseCase removeQuoteUseCase;

	@GetMapping(ApiPaths.COMPANIES_BASE_API + ApiPaths.QUOTES_BASE_API)
	public ResponseEntity<GetPageResponse<GetAllQuotesResponse>> getAll(
		@PathVariable Integer companyId,
		@RequestParam(required = false) String clientName,
		@RequestParam(required = false) String quoteNo,
		@RequestParam(required = false) String userName,
		@RequestParam(required = false) String productName,
		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size
	) {
		QuoteSearchCondition condition = new QuoteSearchCondition(
			clientName, quoteNo, userName, productName, startDate, endDate
		);
		Pageable pageable = PageRequest.of(page, size);

		GetPageResponse<GetAllQuotesResponse> response = getAllQuotesUseCase.execute(companyId,
			condition, pageable);

		if (response == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.ok(response);
	}

	@GetMapping(ApiPaths.QUOTES_BASE_API + "/{quoteId}")
	public ResponseEntity<GetQuoteResponse> getQuote(@PathVariable Integer quoteId) {
		GetQuoteResponse response = getQuoteUseCase.execute(quoteId);

		if (response == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.ok(response);
	}

	@PostMapping(ApiPaths.QUOTES_BASE_API)
	public ResponseEntity<?> regist(@RequestBody RegistQuoteRequest request) {
		RegistResultDto result = registQuoteUseCase.execute(request);

		if (!result.isDone()) {
			if (result.status() == RegistResultDto.Status.BAD_REQUEST) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			} else if (result.status() == RegistResultDto.Status.SAVE_FAILED) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(new RegistErpResponse(result.id()));
	}

	@PutMapping(ApiPaths.QUOTES_BASE_API + "/{quoteId}")
	public ResponseEntity<?> modify(@PathVariable Integer quoteId, @RequestBody RegistQuoteRequest request) {
		RegistResultDto result = modifyQuoteUseCase.execute(quoteId, request);

		if (!result.isDone()) {
			if (result.status() == RegistResultDto.Status.BAD_REQUEST) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			} else if (result.status() == RegistResultDto.Status.SAVE_FAILED) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			} else if (result.status() == RegistResultDto.Status.NOT_FOUND) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		}

		return ResponseEntity.ok(new RegistErpResponse(result.id()));
	}

	@PostMapping(ApiPaths.QUOTES_BASE_API + "/delete")
	public ResponseEntity<Void> removeAll(@RequestBody RemoveAllErpRequest request) {
		boolean deleted = removeAllQuotesUseCase.execute(request.ids());

		return deleted ? ResponseEntity.noContent().build() :
			ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}

	@DeleteMapping(ApiPaths.QUOTES_BASE_API + "/{quoteId}")
	public ResponseEntity<Void> remove(@PathVariable Integer quoteId) {
		boolean deleted = removeQuoteUseCase.execute(quoteId);

		return deleted ? ResponseEntity.ok().build() :
			ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
