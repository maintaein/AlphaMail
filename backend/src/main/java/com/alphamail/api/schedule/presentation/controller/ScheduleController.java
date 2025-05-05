package com.alphamail.api.schedule.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.schedule.application.usecase.CreateScheduleUseCase;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

	private final CreateScheduleUseCase createScheduleUseCase;

	@PostMapping
	public ResponseEntity<?> addSchedule(@RequestBody CreateScheduleRequest request,
		@AuthenticationPrincipal UserDetails userDetails) {

		//임시 아이디 1
		Integer userId = 1;

		createScheduleUseCase.execute(request, userId);

		return ResponseEntity.ok().build();

	}
}
