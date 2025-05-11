package com.alphamail.api.assistants.infrastructure.repository;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.domain.repository.TemporaryScheduleRepository;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryScheduleEntity;
import com.alphamail.api.assistants.infrastructure.mapper.TemporaryScheduleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TemporaryScheduleRepositoryImpl implements TemporaryScheduleRepository {

    private final TemporaryScheduleJpaRepository jpaRepository;
    private final TemporaryScheduleMapper mapper;

    @Override
    public TemporarySchedule save(TemporarySchedule schedule) {
        TemporaryScheduleEntity entity = mapper.toEntity(schedule);
        return mapper.toDomain(jpaRepository.save(entity));
    }

    @Override
    public Optional<TemporarySchedule> findById(Integer id) {
        return jpaRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public void deleteById(Integer id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public TemporarySchedule update(TemporarySchedule schedule) {
        TemporaryScheduleEntity entity = mapper.toEntity(schedule);
        return mapper.toDomain(jpaRepository.save(entity)); // save acts as update
    }
}

