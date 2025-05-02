package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetPurchaseOrderUseCase {
}
