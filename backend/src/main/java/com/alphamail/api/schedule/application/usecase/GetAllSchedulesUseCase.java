package com.alphamail.api.schedule.application.usecase;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.api.schedule.presentation.dto.ScheduleListResponse;
import com.alphamail.common.exception.BadRequestException;
import com.alphamail.common.exception.ErrorMessage;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetAllSchedulesUseCase {

	private final ScheduleRepository scheduleRepository;

	public ScheduleListResponse execute(LocalDate startDate, LocalDate endDate,
		String keyword, Pageable pageable, Integer userId) {

		if (startDate.isAfter(endDate)) {
			throw new BadRequestException(ErrorMessage.SCHEDULE_DATE_INVALID);
		}

		Page<Schedule> schedulePage;

		if (keyword != null && !keyword.isEmpty()) {
			schedulePage = scheduleRepository.findByPeriodAndKeyword(startDate, endDate, keyword, userId, pageable);
		} else {
			schedulePage = scheduleRepository.findByPeriod(startDate, endDate, userId, pageable);
		}

		return ScheduleListResponse.from(schedulePage);

	}


}
