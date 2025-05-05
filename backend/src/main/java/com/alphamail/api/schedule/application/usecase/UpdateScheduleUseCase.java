package com.alphamail.api.schedule.application.usecase;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.api.schedule.presentation.dto.UpdateScheduleRequest;
import com.alphamail.api.schedule.presentation.dto.UpdateScheduleResponse;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.ForbiddenException;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateScheduleUseCase {
	private final ScheduleRepository scheduleRepository;

	public UpdateScheduleResponse execute(Integer scheduleId, UpdateScheduleRequest request, Integer userId) {
		Schedule schedule = scheduleRepository.findById(scheduleId)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));

		if (!schedule.getUserId().equals(userId)) {
			throw new ForbiddenException(ErrorMessage.FORBIDDEN);
		}


		Schedule updatedSchedule = schedule.update(
			request.name(),
			request.description(),
			request.startTime(),
			request.endTime());


		return UpdateScheduleResponse.from(scheduleRepository.save(updatedSchedule));

	}
}
