package com.alphamail.api.erp.infrastructure.specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.alphamail.api.erp.infrastructure.entity.QuoteEntity;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class QuoteSpecification {

	public static Specification<QuoteEntity> hasClientName(String clientName) {
		return (root, query, cb) -> clientName == null ? null :
			cb.like(cb.lower(root.get("clientEntity").get("corpName")), "%" + clientName.toLowerCase() + "%");
	}

	public static Specification<QuoteEntity> hasQuoteNo(String quoteNo) {
		return (root, query, cb) -> quoteNo == null ? null :
			cb.like(root.get("quoteNo"), "%" + quoteNo + "%");
	}

	public static Specification<QuoteEntity> hasUserName(String userName) {
		return (root, query, cb) -> userName == null ? null :
			cb.like(cb.lower(root.get("userEntity").get("name")), "%" + userName.toLowerCase() + "%");
	}

	public static Specification<QuoteEntity> hasProductName(String productName) {
		return (root, query, cb) -> {
			if (productName == null) {
				return null;
			}
			Join<Object, Object> products = root.join("quoteProducts", JoinType.LEFT);
			Join<Object, Object> product = products.join("productEntity", JoinType.LEFT);
			query.distinct(true);
			return cb.like(cb.lower(product.get("name")), "%" + productName.toLowerCase() + "%");
		};
	}

	public static Specification<QuoteEntity> betweenDates(LocalDateTime start, LocalDateTime end) {
		return (root, query, cb) -> {
			if (start != null && end != null) {
				return cb.between(root.get("createdAt"), start, end);
			} else if (start != null) {
				return cb.greaterThanOrEqualTo(root.get("createdAt"), start);
			} else if (end != null) {
				return cb.lessThanOrEqualTo(root.get("createdAt"), end);
			}
			return null;
		};
	}

	public static Specification<QuoteEntity> notDeleted() {
		return (root, query, cb) -> cb.isNull(root.get("deletedAt"));
	}
}
