package com.alphamail.api.user.presentation.controller;

import com.alphamail.api.user.application.usecase.RegistUserUseCase;
import com.alphamail.api.user.presentation.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final RegistUserUseCase registUserUseCase;

    @PostMapping
    public ResponseEntity<Boolean> signUp(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(registUserUseCase.execute(signUpRequest));
    }

}
