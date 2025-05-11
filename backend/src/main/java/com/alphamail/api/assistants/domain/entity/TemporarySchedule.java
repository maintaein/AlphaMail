package com.alphamail.api.assistants.domain.entity;

import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleRequest;

import java.time.LocalDateTime;

public record TemporarySchedule(
        Integer userId, // UserEntity가 아닌 userId
        String name,
        String description,
        LocalDateTime startTime,
        LocalDateTime endTime
) {
    public static TemporarySchedule from(TemporaryScheduleRequest request, Integer userId) {
        return new TemporarySchedule(
                userId,
                request.name(),
                request.description(),
                LocalDateTime.parse(request.startTime()),
                LocalDateTime.parse(request.endTime())
        );
    }

}
