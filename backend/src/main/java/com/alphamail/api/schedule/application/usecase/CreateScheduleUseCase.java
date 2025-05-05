package com.alphamail.api.schedule.application.usecase;

import org.springframework.stereotype.Service;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;
import com.alphamail.common.exception.BadRequestException;
import com.alphamail.common.exception.ErrorMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateScheduleUseCase {

	private final ScheduleRepository scheduleRepository;

	public void execute(CreateScheduleRequest request, Integer userId) {

		if (request.endTime().isBefore(request.startTime())) {
			throw new BadRequestException(ErrorMessage.SCHEDULE_TIME_INVALID);
		}

		Schedule schedule = Schedule.create(request, userId);

		scheduleRepository.save(schedule);
	}
}
