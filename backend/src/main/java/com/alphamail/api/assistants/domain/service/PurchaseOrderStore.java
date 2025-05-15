package com.alphamail.api.assistants.domain.service;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;

public interface PurchaseOrderStore {

    PurchaseOrder save(PurchaseOrder purchaseOrder);
}
