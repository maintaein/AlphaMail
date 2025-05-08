package com.alphamail.api.schedule.infrastructure.repository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alphamail.api.schedule.infrastructure.entity.ScheduleEntity;

public interface ScheduleJpaRepository extends JpaRepository<ScheduleEntity, Integer> {

	Optional<ScheduleEntity> findByIdAndUserUserId(Integer scheduleId, Integer userId);

	@Query("SELECT s FROM ScheduleEntity s WHERE s.user.userId = :userId "
		+ "AND NOT (s.endTime < :startTime OR s.startTime > :endTime) "
		+ "AND s.name LIKE %:keyword%")
	Page<ScheduleEntity> findByPeriodAndKeyword(@Param("startTime") LocalDateTime startTime,
												@Param("endTime") LocalDateTime endTime,
												@Param("keyword") String keyword,
												@Param("userId") Integer userId, Pageable pageable);

	@Query("SELECT s FROM ScheduleEntity s WHERE s.user.userId = :userId "
		+ "AND NOT (s.endTime < :startTime OR s.startTime > :endTime)")
	Page<ScheduleEntity> findByPeriod(@Param("startTime") LocalDateTime startTime,
									@Param("endTime") LocalDateTime endTime,
									@Param("userId") Integer userId, Pageable pageable);

	@Query("SELECT s FROM ScheduleEntity s WHERE s.user.userId = :userId "
		+ "AND s.name LIKE %:keyword%")
	Page<ScheduleEntity> findByKeyword(@Param("keyword")String keyword,
									@Param("userId")Integer userId, Pageable pageable);
}
