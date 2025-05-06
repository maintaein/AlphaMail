package com.alphamail.api.erp.infrastructure.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quote_products")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuoteProductEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quote_id", nullable = false)
	private QuoteEntity quoteEntity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private ProductEntity productEntity;

	@Column(nullable = false)
	private Integer count;

	@Column(nullable = false)
	private Long price;

	@SuppressWarnings("LombokSetterMayBeUsed")
	public void setQuoteEntity(QuoteEntity quoteEntity) {
		this.quoteEntity = quoteEntity;
	}
}
