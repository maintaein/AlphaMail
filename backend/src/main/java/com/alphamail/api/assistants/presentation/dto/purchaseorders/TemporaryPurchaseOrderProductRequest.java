package com.alphamail.api.assistants.presentation.dto.purchaseorders;

import com.alphamail.api.assistants.domain.entity.TemporaryPurchaseOrderProduct;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;

public record TemporaryPurchaseOrderProductRequest(
        Integer id,
        Integer productId,
        String productName,
        Integer count
) {

}
