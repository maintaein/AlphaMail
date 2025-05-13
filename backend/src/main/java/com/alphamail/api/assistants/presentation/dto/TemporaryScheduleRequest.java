package com.alphamail.api.assistants.presentation.dto;


import java.time.LocalDateTime;

public record TemporaryScheduleRequest(
    String name,
    String startTime,
    String endTime,
    String description,
    String userEmail
){
}
