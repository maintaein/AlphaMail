package com.alphamail.api.assistants.infrastructure.mapper;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryScheduleEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TemporaryScheduleMapper {

    @Mapping(target = "id", source = "id")
    TemporarySchedule toDomain(TemporaryScheduleEntity entity);

    @Mapping(target = "id", source = "id")
    TemporaryScheduleEntity toEntity(TemporarySchedule domain);
}
