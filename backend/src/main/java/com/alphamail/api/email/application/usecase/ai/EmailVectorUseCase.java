package com.alphamail.api.email.application.usecase.ai;

import com.alphamail.api.email.domain.entity.EmailVector;
import com.alphamail.api.email.domain.repository.EmailVectorRepository;
import com.alphamail.api.email.presentation.dto.ReceiveEmailRequest;
import com.alphamail.api.email.presentation.dto.VectorDBRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailVectorUseCase {

    private final EmailVectorRepository emailVectorRepository;

    public  Mono<EmailVector> execute(VectorDBRequest request, Integer userId, String threadId) {

        String query = "from : " + request.from() + "\nto : " + request.to() + "\nsubject: " + request.subject() + "\ndate: "+request.date()+ "\n mailContent: " + request.html();

        log.info("날리는 쿼리={}", query);
        return emailVectorRepository.registEmailVector(query, userId, threadId);
    }

}

