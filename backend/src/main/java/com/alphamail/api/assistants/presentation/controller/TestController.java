package com.alphamail.api.assistants.presentation.controller;


import com.alphamail.api.email.application.usecase.ai.EmailMCPUseCase;
import com.alphamail.api.email.application.usecase.ai.EmailVectorUseCase;
import com.alphamail.api.assistants.presentation.dto.ai.EmailMCPRequest;
import com.alphamail.api.assistants.presentation.dto.ai.EmailMCPResponse;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorRequest;
import com.alphamail.api.assistants.presentation.dto.ai.EmailVectorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

//    private final EmailVectorUseCase emailVectorUseCase;
//    private final EmailMCPUseCase emailMCPUseCase;
//
//    @PostMapping("/send")
//    public Mono<ResponseEntity<EmailVectorResponse>> sendEmail(@RequestBody EmailVectorRequest request) {
//        return emailVectorUseCase.execute(request)
//                .map(ResponseEntity::ok);
//    }
//
//    @PostMapping("/mcp")
//    public Mono<ResponseEntity<EmailMCPResponse>> sendToMCP(@RequestBody EmailMCPRequest request) {
//        return emailMCPUseCase.execute(request)
//                .map(ResponseEntity::ok);
//    }


}
