package com.alphamail.api.assistants.presentation.dto;

import java.time.LocalDateTime;

public record UpdateTemporaryScheduleRequest(
        String name,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String description,
        Integer temporaryScheduleId
){
}
