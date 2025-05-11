package com.alphamail.api.assistants.presentation.dto;

public record TemporaryScheduleRequest(
    String name,
    String startTime,
    String endTime,
    String description){
}
