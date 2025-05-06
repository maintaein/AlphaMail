package com.alphamail.api.erp.infrastructure.specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class PurchaseOrderSpecification {

	public static Specification<PurchaseOrderEntity> hasClientName(String clientName) {
		return (root, query, cb) -> clientName == null ? null :
			cb.like(cb.lower(root.get("clientEntity").get("name")), "%" + clientName.toLowerCase() + "%");
	}

	public static Specification<PurchaseOrderEntity> hasOrderNo(String orderNo) {
		return (root, query, cb) -> orderNo == null ? null :
			cb.like(root.get("orderNo"), "%" + orderNo + "%");
	}

	public static Specification<PurchaseOrderEntity> hasUserName(String userName) {
		return (root, query, cb) -> userName == null ? null :
			cb.like(cb.lower(root.get("userEntity").get("name")), "%" + userName.toLowerCase() + "%");
	}

	public static Specification<PurchaseOrderEntity> hasProductName(String productName) {
		return (root, query, cb) -> {
			if (productName == null) return null;
			Join<Object, Object> products = root.join("products", JoinType.LEFT);
			Join<Object, Object> product = products.join("productEntity", JoinType.LEFT);
			query.distinct(true);
			return cb.like(cb.lower(product.get("name")), "%" + productName.toLowerCase() + "%");
		};
	}

	public static Specification<PurchaseOrderEntity> betweenDates(LocalDateTime start, LocalDateTime end) {
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

	public static Specification<PurchaseOrderEntity> notDeleted() {
		return (root, query, cb) -> cb.isNull(root.get("deletedAt"));
	}
}
