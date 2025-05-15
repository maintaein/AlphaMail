package com.alphamail.api.chatbot.infrastructure.adapter;

import java.util.Map;

import com.alphamail.api.chatbot.domain.common.VectorizableDocument;
import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.erp.domain.entity.PurchaseOrder;

public class PurchaseOrderVectorAdapter implements VectorizableDocument {

	private final PurchaseOrder purchaseOrder;

	public PurchaseOrderVectorAdapter(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	@Override
	public String toVectorText() {
		return """
			등록번호: %s
			거래처명: %s
			발주일(발주서 생성일): %s
			납기일: %s
			""".formatted(
			purchaseOrder.getOrderNo(),
			purchaseOrder.getClient().getCorpName(),
			purchaseOrder.getCreatedAt(),
			purchaseOrder.getDeliverAt()
		);
	}

	@Override
	public Map<String, Object> toMetadata() {
		return Map.of(
			"owner_id", purchaseOrder.getCompany().getCompanyId(),
			"owner_type", "company",
			"user_id", purchaseOrder.getUser().getId().getValue(),
			"document_type", getDocumentType(),
			"domain_id", purchaseOrder.getPurchaseOrderId()
		);
	}

	@Override
	public String getId() {
		return String.valueOf(purchaseOrder.getPurchaseOrderId());
	}

	@Override
	public String getDocumentType() {
		return DocumentTypes.PURCHASE_ORDER;
	}
}
