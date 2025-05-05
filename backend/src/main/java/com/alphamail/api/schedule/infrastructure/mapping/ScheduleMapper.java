package com.alphamail.api.schedule.infrastructure.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.infrastructure.entity.ScheduleEntity;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {

	@Mapping(source = "user.userId", target = "userId")
	@Mapping(source = "id", target = "scheduleId")
	Schedule toDomain(ScheduleEntity scheduleEntity);

	@Mapping(source = "userId", target = "user.userId")
	@Mapping(source = "scheduleId", target = "id")
	ScheduleEntity toEntity(Schedule schedule);
}
