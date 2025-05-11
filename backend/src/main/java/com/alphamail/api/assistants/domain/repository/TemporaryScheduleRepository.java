package com.alphamail.api.assistants.domain.repository;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;

import java.util.Optional;

public interface TemporaryScheduleRepository {
    TemporarySchedule save(TemporarySchedule schedule);
    Optional<TemporarySchedule> findById(Integer id);
    void deleteById(Integer id);
    TemporarySchedule update(TemporarySchedule schedule);
}