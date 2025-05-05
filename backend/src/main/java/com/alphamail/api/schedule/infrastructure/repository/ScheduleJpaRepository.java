package com.alphamail.api.schedule.infrastructure.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alphamail.api.schedule.infrastructure.entity.ScheduleEntity;

public interface ScheduleJpaRepository extends JpaRepository<ScheduleEntity, Integer> {

	@Query("SELECT EXISTS(SELECT 1 FROM ScheduleEntity s WHERE s.user.id = :userId "
		+ "AND (s.startTime <= :end AND s.endTime >= :start))")
	boolean existsSchedule(@Param("userId") Integer userId,
		@Param("start") LocalDateTime start,
		@Param("end") LocalDateTime end);
}
