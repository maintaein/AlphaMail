package com.alphamail.api.assistants.infrastructure.repository;

import com.alphamail.api.assistants.infrastructure.entity.TemporaryScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemporaryScheduleJpaRepository extends JpaRepository<TemporaryScheduleEntity, Integer> {
}
