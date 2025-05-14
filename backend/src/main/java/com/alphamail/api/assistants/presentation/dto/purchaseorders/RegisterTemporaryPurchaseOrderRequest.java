package com.alphamail.api.assistants.presentation.dto.purchaseorders;

import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;

import java.time.LocalDateTime;
import java.util.List;


public record RegisterTemporaryPurchaseOrderRequest(
        Integer id,
        Integer clientId,
        LocalDateTime deliverAt,
        String shippingAddress,
        String manager,
        String managerNumber,
        String paymentTerm,
        List<RegisterTemporaryPurchaseOrderProductRequest> products
) {}
