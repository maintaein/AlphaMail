package com.alphamail.api.schedule.domain.repository;

import java.time.LocalDateTime;

import org.springframework.stereotype.Repository;

import com.alphamail.api.schedule.domain.entity.Schedule;

@Repository
public interface ScheduleRepository {
	Schedule save(Schedule schedule);

	boolean existsSchedule(Integer userId, LocalDateTime start, LocalDateTime end);
}
