package com.alphamail.api.assistants.application.usecase;

import com.alphamail.api.assistants.domain.entity.VectorDB;
import com.alphamail.api.assistants.domain.repository.SaveVectorDBRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveVectorDBUseCase {

    private final SaveVectorDBRepository saveVectorDBRepository;

    public void execute(String threadId, Integer userId, String emailContent){
        VectorDB vectorDB = new VectorDB(threadId, Integer.toString(userId),emailContent);
        saveVectorDBRepository.sendEmailToAi(vectorDB);
    }

}

