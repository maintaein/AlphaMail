package com.alphamail.api.assistants.application.usecase.purchaseorder;

import com.alphamail.api.assistants.domain.entity.TemporaryPurchaseOrder;
import com.alphamail.api.assistants.domain.repository.TemporaryPurchaseOrderRepository;
import com.alphamail.api.assistants.domain.service.EmailAttachmentReader;
import com.alphamail.api.assistants.presentation.dto.purchaseorders.TemporaryPurchaseOrderResponse;
import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetTemporaryPurchaseOrderUseCase {

    private final TemporaryPurchaseOrderRepository temporaryPurchaseOrderRepository;
    private final EmailAttachmentReader emailAttachmentReader;
    
    public TemporaryPurchaseOrderResponse execute(Integer temporaryPurchaseOrderId,Integer userId) {

        TemporaryPurchaseOrder temporaryPurchaseOrder = temporaryPurchaseOrderRepository.findByIdAndUserId(temporaryPurchaseOrderId, userId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));;

        List<EmailAttachment> emailAttachment = emailAttachmentReader.findAllByEmailId(temporaryPurchaseOrder.getEmail().getEmailId());
        return TemporaryPurchaseOrderResponse.from(temporaryPurchaseOrder, emailAttachment);
        
    }
}
