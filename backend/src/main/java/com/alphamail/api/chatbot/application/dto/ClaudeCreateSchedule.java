package com.alphamail.api.chatbot.application.dto;

import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;

public record ClaudeCreateSchedule(
	String reply,
	CreateScheduleRequest content
) {
}
