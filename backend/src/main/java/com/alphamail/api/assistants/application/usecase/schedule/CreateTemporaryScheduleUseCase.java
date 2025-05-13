package com.alphamail.api.assistants.application.usecase.schedule;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.domain.repository.TemporaryScheduleRepository;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleRequest;
import com.alphamail.api.user.application.port.LoadUserPort;
import com.alphamail.api.user.domain.valueobject.UserId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateTemporaryScheduleUseCase {

    private final TemporaryScheduleRepository temporaryScheduleRepository;
    private final LoadUserPort loadUserPort;

    public void execute(TemporaryScheduleRequest temporaryScheduleRequest) {
        String recipientEmail  = temporaryScheduleRequest.userEmail();
        UserId userId = loadUserPort.loadUserIdByEmail(recipientEmail);
        temporaryScheduleRepository.save(TemporarySchedule.create(temporaryScheduleRequest, userId.getValue()));
    }
}
