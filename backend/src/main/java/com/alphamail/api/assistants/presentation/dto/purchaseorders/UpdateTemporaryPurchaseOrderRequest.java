package com.alphamail.api.assistants.presentation.dto.purchaseorders;

import com.alphamail.api.assistants.domain.entity.TemporaryPurchaseOrderProduct;
import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.presentation.dto.schedule.TemporaryScheduleResponse;

import java.time.LocalDateTime;
import java.util.List;

public record UpdateTemporaryPurchaseOrderRequest(
        Integer id,
        String clientName,
        Integer clientId,
        LocalDateTime deliverAt,
        String shippingAddress,
        Boolean hasShippingAddress,
        String manager,
        String managerNumber,
        String paymentTerm,
        List<TemporaryPurchaseOrderProductRequest> products
) {}
