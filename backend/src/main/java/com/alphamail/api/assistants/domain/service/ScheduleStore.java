package com.alphamail.api.assistants.domain.service;

import com.alphamail.api.schedule.domain.entity.Schedule;

public interface ScheduleStore {
    Schedule save(Schedule schedule);
}
