package com.alphamail.api.schedule.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.schedule.application.usecase.ChangeToggleUseCase;
import com.alphamail.api.schedule.application.usecase.CreateScheduleUseCase;
import com.alphamail.api.schedule.application.usecase.UpdateScheduleUseCase;
import com.alphamail.api.schedule.presentation.dto.ChangeScheduleToggleRequest;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;
import com.alphamail.api.schedule.presentation.dto.ToggleScheduleResponse;
import com.alphamail.api.schedule.presentation.dto.UpdateScheduleRequest;
import com.alphamail.api.schedule.presentation.dto.UpdateScheduleResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

	private final CreateScheduleUseCase createScheduleUseCase;
	private final ChangeToggleUseCase changeToggleUseCase;
	private final UpdateScheduleUseCase updateScheduleUseCase;

	@PostMapping
	public ResponseEntity<?> addSchedule(@RequestBody CreateScheduleRequest request,
		@AuthenticationPrincipal UserDetails userDetails) {

		//임시 아이디 1
		Integer userId = 1;

		createScheduleUseCase.execute(request, userId);

		return ResponseEntity.ok().build();

	}

	@PatchMapping("/{scheduleId}/toggles")
	public ResponseEntity<ToggleScheduleResponse> toggleSchedule(@PathVariable Integer scheduleId,
		@RequestBody ChangeScheduleToggleRequest request,
		@AuthenticationPrincipal UserDetails userDetails) {

		//임시 아이디 1
		Integer userId = 1;

		ToggleScheduleResponse response = changeToggleUseCase.execute(scheduleId, request, userId);

		return ResponseEntity.ok().body(response);

	}

	@PutMapping("/{scheduleId}")
	public ResponseEntity<UpdateScheduleResponse> updateSchedule(@PathVariable Integer scheduleId,
		@RequestBody UpdateScheduleRequest request,
		@AuthenticationPrincipal UserDetails userDetails) {

		//임시 아이디 1
		Integer userId = 1;

		UpdateScheduleResponse updatedResponse = updateScheduleUseCase.execute(scheduleId, request, userId);

		return ResponseEntity.ok().body(updatedResponse);
	}
}
