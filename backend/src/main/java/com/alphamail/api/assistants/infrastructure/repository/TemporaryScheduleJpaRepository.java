package com.alphamail.api.assistants.infrastructure.repository;

import com.alphamail.api.assistants.infrastructure.entity.TemporaryScheduleEntity;
import com.alphamail.api.schedule.infrastructure.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TemporaryScheduleJpaRepository extends JpaRepository<TemporaryScheduleEntity, Integer> {

    Optional<TemporaryScheduleEntity> findByIdAndUserUserId(Integer scheduleId, Integer userId);
}
