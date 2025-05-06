package com.alphamail.api.erp.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.alphamail.api.erp.presentation.dto.quote.RegistQuoteRequest;
import com.alphamail.api.organization.domain.entity.Client;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Quote {
	private Integer quoteId;
	private String quoteNo;
	private User user;
	private Company company;
	private Group group;
	private Client client;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;
	private List<QuoteProduct> quoteProducts;

	public static Quote create(RegistQuoteRequest request, User user, Company company, Group group, Client client) {
		Quote quote = Quote.builder()
			.user(user)
			.company(company)
			.group(group)
			.client(client)
			.quoteNo(
				request.quoteNo() != null ? request.quoteNo() : generateQuoteNo()
			)
			.createdAt(LocalDateTime.now())
			.quoteProducts(new ArrayList<>())
			.build();

		List<QuoteProduct> products = request.products().stream()
			.map(p -> {
				QuoteProduct product = QuoteProduct.builder()
					.product(Product.of(p.productId()))
					.count(p.count())
					.price(p.price())
					.build();
				product.setQuote(quote);
				return product;
			})
			.toList();

		quote.getQuoteProducts().addAll(products);
		return quote;
	}

	private static String generateQuoteNo() {
		String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		String randomPart = UUID.randomUUID().toString().substring(0, 6);
		return "QU-" + datePart + "-" + randomPart;
	}
}
