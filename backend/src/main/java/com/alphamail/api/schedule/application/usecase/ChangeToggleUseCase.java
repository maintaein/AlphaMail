package com.alphamail.api.schedule.application.usecase;

import org.springframework.stereotype.Service;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.api.schedule.presentation.dto.ChangeScheduleToggleRequest;
import com.alphamail.api.schedule.presentation.dto.ToggleScheduleResponse;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.ForbiddenException;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChangeToggleUseCase {

	private final ScheduleRepository scheduleRepository;

	public ToggleScheduleResponse execute(Integer scheduleId, ChangeScheduleToggleRequest request, Integer userId) {

		Schedule schedule = scheduleRepository.findById(scheduleId)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));

		if (!schedule.getUserId().equals(userId)) {
			throw new ForbiddenException(ErrorMessage.FORBIDDEN);
		}

		Schedule updatedSchedule = schedule.updateIsDone(request.isDone());

		return ToggleScheduleResponse.from(scheduleRepository.save(updatedSchedule));
	}
}
