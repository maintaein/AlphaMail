package com.alphamail.api.assistants.infrastructure.mapper;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryScheduleEntity;
import com.alphamail.common.mapper.EntityReferenceFinder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class})
public interface TemporaryScheduleMapper {

    @Mapping(source = "id", target = "temporaryScheduleId")
    @Mapping(source = "user.userId", target = "userId")
    TemporarySchedule toDomain(TemporaryScheduleEntity entity);

    @Mapping(source = "temporaryScheduleId", target = "id")
    @Mapping(source = "userId", target = "user", qualifiedByName = "toUserEntity")
    TemporaryScheduleEntity toEntity(TemporarySchedule domain);
}
