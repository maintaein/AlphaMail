package com.alphamail.api.assistants.application.usecase.schedule;

import com.alphamail.api.assistants.domain.entity.TemporarySchedule;
import com.alphamail.api.assistants.domain.repository.TemporaryScheduleRepository;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleRequest;
import com.alphamail.api.user.application.port.LoadUserPort;
import com.alphamail.api.user.domain.repository.UserRepository;
import com.alphamail.api.user.domain.valueobject.UserId;
import com.alphamail.common.exception.DuplicateResourceException;
import com.alphamail.common.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateTemporaryScheduleUseCase {

    private final TemporaryScheduleRepository temporaryScheduleRepository;
    private final LoadUserPort loadUserPort;
    private final UserRepository userRepository;

    public void execute(TemporaryScheduleRequest temporaryScheduleRequest) {
        String recipientEmail  = temporaryScheduleRequest.userEmail();

        if (userRepository.findByEmail(recipientEmail).isPresent()) {
            throw new DuplicateResourceException(ErrorMessage.EMAIL_ALREADY_EXISTS);
        }
        UserId userId = loadUserPort.loadUserIdByEmail(recipientEmail);
        temporaryScheduleRepository.save(TemporarySchedule.create(temporaryScheduleRequest, userId.getValue()));
    }
}
