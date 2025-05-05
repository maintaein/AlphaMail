package com.alphamail.api.schedule.presentation.dto;

import java.time.LocalDateTime;

import com.alphamail.api.schedule.domain.entity.Schedule;

public record ScheduleDetailResponse(
	Integer id,
	String name,
	LocalDateTime startTime,
	LocalDateTime endTime,
	String description,
	Boolean isDone,
	LocalDateTime createdAt
) {
	public static ScheduleDetailResponse from(Schedule schedule) {
		return new ScheduleDetailResponse(schedule.getScheduleId(),
			schedule.getName(),
			schedule.getStartTime(),
			schedule.getEndTime(),
			schedule.getDescription(),
			schedule.getIsDone(),
			schedule.getCreatedAt());

	}
}
