package com.alphamail.api.schedule.application.usecase;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

	public ScheduleListResponse execute(LocalDateTime startTime, LocalDateTime endTime,
		String keyword, Pageable pageable, Integer userId) {

		boolean isSearchMode = keyword != null && !keyword.isEmpty();

		if ((startTime == null && endTime != null) || (startTime != null && endTime == null)) {
			throw new BadRequestException(ErrorMessage.SCHEDULE_DATE_PAIR_REQUIRED);
		}

		if (startTime != null && endTime != null && startTime.isAfter(endTime)) {
			throw new BadRequestException(ErrorMessage.SCHEDULE_DATE_INVALID);
		}

		Pageable effectivePageable = isSearchMode ? pageable :
			PageRequest.of(0, Integer.MAX_VALUE, pageable.getSort());

		Page<Schedule> schedulePage;

		if (isSearchMode) {
			if (startTime == null || endTime == null) {
				schedulePage = scheduleRepository.findByKeyword(keyword, userId, effectivePageable);
			} else {
				schedulePage = scheduleRepository.findByPeriodAndKeyword(
					startTime, endTime, keyword, userId, effectivePageable);
			}
		} else {
			schedulePage = scheduleRepository.findByPeriod(startTime, endTime, userId, effectivePageable);
		}

		return ScheduleListResponse.from(schedulePage);

	}


}
