package com.alphamail.api.schedule.application.usecase;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.api.schedule.presentation.dto.ScheduleDetailResponse;
import com.alphamail.common.exception.BadRequestException;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetScheduleDetailUseCase {

	private final ScheduleRepository scheduleRepository;

	public ScheduleDetailResponse execute(Integer scheduleId, Integer userId) {

		Schedule schedule = scheduleRepository.findByIdAndUserId(scheduleId, userId)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));

		return ScheduleDetailResponse.from(schedule);
	}
}
