package com.alphamail.api.schedule.infrastructure.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alphamail.api.schedule.infrastructure.entity.ScheduleEntity;

public interface ScheduleJpaRepository extends JpaRepository<ScheduleEntity, Integer> {

	Optional<ScheduleEntity> findByIdAndUserUserId(Integer scheduleId, Integer userId);
}
