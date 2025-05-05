package com.alphamail.api.schedule.presentation.dto;

import java.time.LocalDateTime;

public record CreateScheduleRequest(
	String name,
	LocalDateTime startTime,
	LocalDateTime endTime,
	String description

) {

}
