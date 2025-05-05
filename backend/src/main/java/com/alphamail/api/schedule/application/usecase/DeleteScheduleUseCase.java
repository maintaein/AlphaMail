package com.alphamail.api.schedule.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.ForbiddenException;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DeleteScheduleUseCase {
	private final ScheduleRepository scheduleRepository;

	public void execute(Integer scheduleId, Integer userId) {

		Schedule schedule = scheduleRepository.findByIdAndUserId(scheduleId, userId)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));

		scheduleRepository.deleteById(scheduleId);

	}
}
