package com.alphamail.api.assistants.presentation.dto;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.presentation.dto.ToggleScheduleResponse;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public record TemporaryScheduleResponse(
        Integer temporaryScheduleId,
        String name,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String description
){
    public static TemporaryScheduleResponse from(TemporarySchedule temporarySchedule) {
        return new TemporaryScheduleResponse(
                temporarySchedule.getTemporaryScheduleId(),
                temporarySchedule.getName(),
                temporarySchedule.getStartTime(),
                temporarySchedule.getEndTime(),
                temporarySchedule.getDescription()
        );
    }
}

