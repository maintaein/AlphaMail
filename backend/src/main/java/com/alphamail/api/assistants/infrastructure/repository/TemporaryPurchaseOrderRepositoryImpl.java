package com.alphamail.api.assistants.infrastructure.repository;

import com.alphamail.api.assistants.domain.entity.TemporaryPurchaseOrder;
import com.alphamail.api.assistants.domain.repository.TemporaryPurchaseOrderRepository;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryPurchaseOrderEntity;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryPurchaseOrderProductEntity;
import com.alphamail.api.assistants.infrastructure.mapper.TemporaryPurchaseOrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TemporaryPurchaseOrderRepositoryImpl implements TemporaryPurchaseOrderRepository {

    private final TemporaryPurchaseOrderJpaRepository temporaryPurchaseOrderJpaRepository;
    private final TemporaryPurchaseOrderMapper temporaryPurchaseOrderMapper;

    @Override
    public TemporaryPurchaseOrder save(TemporaryPurchaseOrder temporaryPurchaseOrder) {
        TemporaryPurchaseOrderEntity entity = temporaryPurchaseOrderMapper.toEntity(temporaryPurchaseOrder);

        for (TemporaryPurchaseOrderProductEntity productEntity : entity.getTemporaryPurchaseOrderProductEntity()) {
            productEntity.setPurchaseOrderEntity(entity);
        }

        return temporaryPurchaseOrderMapper.toDomain(temporaryPurchaseOrderJpaRepository.save(entity));
    }

    @Override
    public Optional<TemporaryPurchaseOrder> findByIdAndUserId(Integer temporaryPurchaseOrderId, Integer userId) {
        return temporaryPurchaseOrderJpaRepository.findByIdAndUserUserId(temporaryPurchaseOrderId, userId)
                .map(temporaryPurchaseOrderMapper::toDomain);
    }

    @Override
    public void deleteById(Integer orderId) {
        temporaryPurchaseOrderJpaRepository.deleteById(orderId);
    }
}
