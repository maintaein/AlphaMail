package com.alphamail.api.schedule.infrastructure.repository;

import java.time.LocalDateTime;

import org.springframework.stereotype.Repository;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.api.schedule.infrastructure.entity.ScheduleEntity;
import com.alphamail.api.schedule.infrastructure.mapping.ScheduleMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepository {

	private final ScheduleJpaRepository jpaRepository;
	private final ScheduleMapper scheduleMapper;


	@Override
	public Schedule save(Schedule schedule) {
		ScheduleEntity entity = scheduleMapper.toEntity(schedule);
		return scheduleMapper.toDomain(jpaRepository.save(entity));
	}

	@Override
	public boolean existsSchedule(Integer userId, LocalDateTime start, LocalDateTime end) {
		return jpaRepository.existsSchedule(userId, start, end);
	}
}
