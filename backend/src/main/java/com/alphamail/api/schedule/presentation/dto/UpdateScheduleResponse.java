package com.alphamail.api.schedule.presentation.dto;

import java.time.LocalDateTime;

import com.alphamail.api.schedule.domain.entity.Schedule;

public record UpdateScheduleResponse(
	Integer id,
	String name,
	String description,
	LocalDateTime startTime,
	LocalDateTime endTime,
	Boolean isDone
) {
	public static UpdateScheduleResponse from(Schedule schedule) {
		return new UpdateScheduleResponse(
			schedule.getScheduleId(),
			schedule.getName(),
			schedule.getDescription(),
			schedule.getStartTime(),
			schedule.getEndTime(),
			schedule.getIsDone()
		);
	}
}
