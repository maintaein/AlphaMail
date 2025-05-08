package com.alphamail.api.erp.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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

	public void updateUser(User user) {
		this.user = user;
	}

	public void updateGroup(Group group) {
		this.group = group;
	}

	public void updateClient(Client client) {
		this.client = client;
	}

	public void update(RegistQuoteRequest request) {
		if (request.quoteNo() != null) {
			this.quoteNo = request.quoteNo();
		}

		Map<Integer, QuoteProduct> existingMap = this.quoteProducts.stream()
			.filter(p -> p.getQuoteProductId() != null)
			.collect(Collectors.toMap(QuoteProduct::getQuoteProductId, p -> p));

		List<QuoteProduct> updatedQuotes = new ArrayList<>();

		for (RegistQuoteRequest.QuoteProductDto dto : request.products()) {

			if (dto.quoteProductId() != null && existingMap.containsKey(dto.quoteProductId())) {
				QuoteProduct existing = existingMap.get(dto.quoteProductId());
				existing.update(dto.count(), dto.price(), Product.of(dto.productId()));
				updatedQuotes.add(existing);
			} else {
				QuoteProduct newProduct = QuoteProduct.builder()
					.quoteProductId(null)
					.product(Product.of(dto.productId()))
					.count(dto.count())
					.price(dto.price())
					.build();
				newProduct.setQuote(this);
				updatedQuotes.add(newProduct);
			}
		}

		this.quoteProducts.clear();
		this.quoteProducts.addAll(updatedQuotes);
	}

	private static String generateQuoteNo() {
		String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		String randomPart = UUID.randomUUID().toString().substring(0, 6);
		return "QU-" + datePart + "-" + randomPart;
	}
}
