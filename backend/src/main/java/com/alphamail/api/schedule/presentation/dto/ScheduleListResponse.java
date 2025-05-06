package com.alphamail.api.schedule.presentation.dto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import com.alphamail.api.schedule.domain.entity.Schedule;

public record ScheduleListResponse(
	List<ScheduleDetailResponse> schedules,
	Integer totalCount,
	Integer pageCount,
	Integer currentPage

) {
	public static ScheduleListResponse from(Page<Schedule> schedulePage) {
		List<ScheduleDetailResponse> scheduleResponses = schedulePage.getContent().stream()
			.map(ScheduleDetailResponse::from)
			.collect(Collectors.toList());

		return new ScheduleListResponse(
			scheduleResponses,
			(int) schedulePage.getTotalElements(),
			schedulePage.getTotalPages(),
			schedulePage.getNumber()
		);
	}
}
