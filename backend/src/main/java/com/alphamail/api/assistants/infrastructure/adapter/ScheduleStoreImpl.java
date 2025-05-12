package com.alphamail.api.assistants.infrastructure.adapter;

import com.alphamail.api.assistants.domain.service.ScheduleStore;
import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class ScheduleStoreImpl implements ScheduleStore {

    private final ScheduleRepository scheduleRepository;

    @Override
    public Schedule save(Schedule schedule) {

        return scheduleRepository.save(schedule);
    }
}
