package com.alphamail.api.schedule.presentation.dto;

import java.time.LocalDateTime;

public record UpdateScheduleRequest(
	String name,
	String description,
	LocalDateTime startTime,
	LocalDateTime endTime
) {
}
