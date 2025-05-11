package com.alphamail.api.assistants.application.usecase;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.domain.repository.TemporaryScheduleRepository;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TemporaryScheduleUseCase {

    private final TemporaryScheduleRepository temporaryScheduleRepository;

    public TemporarySchedule create(TemporaryScheduleRequest temporaryScheduleRequest, Integer userId) {
        return temporaryScheduleRepository.save(TemporarySchedule.from(temporaryScheduleRequest, userId));
    }

    public Optional<TemporarySchedule> getById(Integer id) {
        return temporaryScheduleRepository.findById(id);
    }

    public TemporarySchedule update(TemporarySchedule schedule) {
        return temporaryScheduleRepository.update(schedule);
    }

    public void delete(Integer id) {
        temporaryScheduleRepository.deleteById(id);
    }
}
