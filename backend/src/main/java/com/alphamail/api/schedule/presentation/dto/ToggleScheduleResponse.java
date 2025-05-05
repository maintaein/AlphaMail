package com.alphamail.api.schedule.presentation.dto;

import java.time.LocalDateTime;

import com.alphamail.api.schedule.domain.entity.Schedule;

public record ToggleScheduleResponse(
	Integer id,
	Boolean isDone,
	LocalDateTime updatedAt

) {
	public static ToggleScheduleResponse from(Schedule schedule) {
		return new ToggleScheduleResponse(
			schedule.getScheduleId(),
			schedule.getIsDone(),
			LocalDateTime.now()
		);
	}
}
