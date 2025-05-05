package com.alphamail.api.schedule.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule {
	private Integer scheduleId;
	private Integer userId;
	private String name;
	private String description;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private Boolean isDone;


	public static Schedule create(CreateScheduleRequest request, Integer userId) {
		return Schedule.builder()
			.userId(userId)
			.name(request.name())
			.description(request.description())
			.startTime(request.startTime())
			.endTime(request.endTime())
			.isDone(false)
			.build();
	}


}
