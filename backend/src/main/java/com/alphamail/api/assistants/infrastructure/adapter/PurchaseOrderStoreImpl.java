package com.alphamail.api.assistants.infrastructure.adapter;

import com.alphamail.api.assistants.domain.service.PurchaseOrderStore;
import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PurchaseOrderStoreImpl implements PurchaseOrderStore {

    private final PurchaseOrderRepository purchaseOrderRepository;

    @Override
    public PurchaseOrder save(PurchaseOrder purchaseOrder) {
        return purchaseOrderRepository.save(purchaseOrder);
    }
}
