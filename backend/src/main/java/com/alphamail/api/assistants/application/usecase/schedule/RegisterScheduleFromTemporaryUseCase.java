package com.alphamail.api.assistants.application.usecase.schedule;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.domain.repository.TemporaryScheduleRepository;
import com.alphamail.api.assistants.domain.service.ScheduleStore;
import com.alphamail.api.assistants.presentation.dto.schedule.RegisterScheduleRequest;
import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterScheduleFromTemporaryUseCase {

    private final TemporaryScheduleRepository temporaryScheduleRepository;
    private final ScheduleStore scheduleStore;

    public void execute(RegisterScheduleRequest registerScheduleRequest, Integer userId) {

        CreateScheduleRequest createRequest = registerScheduleRequest.toCreateScheduleRequest();
        Schedule schedule = Schedule.create(createRequest, userId);
        scheduleStore.save(schedule);

        temporaryScheduleRepository.findByIdAndUserId(registerScheduleRequest.temporaryScheduleId(), userId).ifPresent(
                temporarySchedule -> temporaryScheduleRepository.deleteById(registerScheduleRequest.temporaryScheduleId()));

    }


}
