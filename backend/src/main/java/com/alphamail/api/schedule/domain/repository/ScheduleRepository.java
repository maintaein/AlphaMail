package com.alphamail.api.schedule.domain.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.alphamail.api.schedule.domain.entity.Schedule;

@Repository
public interface ScheduleRepository {
	Schedule save(Schedule schedule);

	void deleteById(Integer scheduleId);

	Optional<Schedule> findByIdAndUserId(Integer scheduleId, Integer userId);
}
