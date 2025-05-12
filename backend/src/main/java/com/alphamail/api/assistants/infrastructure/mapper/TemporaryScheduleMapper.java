package com.alphamail.api.assistants.infrastructure.mapper;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryScheduleEntity;
import com.alphamail.common.mapper.EntityReferenceFinder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {EntityReferenceFinder.class})
public interface TemporaryScheduleMapper {

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(target = "id", source = "temporaryScheduleId")
    TemporarySchedule toDomain(TemporaryScheduleEntity entity);

    @Mapping(target = "temporaryScheduleId", source = "id")
    @Mapping(source = "userId", target = "user", qualifiedByName = "toUserEntity")
    TemporaryScheduleEntity toEntity(TemporarySchedule domain);
}
