package com.alphamail.api.assistants.presentation.controller;

import com.alphamail.api.assistants.application.usecase.schedule.*;
import com.alphamail.api.assistants.presentation.dto.RegisterScheduleRequest;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleRequest;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleResponse;
import com.alphamail.api.assistants.presentation.dto.UpdateTemporaryScheduleRequest;
import com.alphamail.common.annotation.Auth;
import com.alphamail.common.constants.ApiPaths;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiPaths.ASSISTANTS_BASE_API + ApiPaths.SCHEDULE_BASE_API)
public class TemporaryScheduleController {

    private final CreateTemporaryScheduleUseCase createTemporaryScheduleUseCase;
    private final GetTemporaryScheduleUseCase getTemporaryScheduleUseCase;
    private final UpdateTemporaryScheduleUseCase updateTemporaryScheduleUseCase;
    private final DeleteTemporaryScheduleUseCase deleteTemporaryScheduleUseCase;
    private final RegisterScheduleFromTemporaryUseCase registerScheduleFromTemporaryUseCase;

    @PostMapping
    public ResponseEntity<String> addTemporarySchedule(
            @RequestBody TemporaryScheduleRequest temporaryScheduleRequest) {
        createTemporaryScheduleUseCase.execute(temporaryScheduleRequest);

        return ResponseEntity.ok("일정등록이 완료 되었습니다");
    }

    @GetMapping("/{temporaryScheduleId}")
    public ResponseEntity<TemporaryScheduleResponse> getTemporarySchedule(
            @PathVariable Integer temporaryScheduleId, @Auth Integer userId) {

        TemporaryScheduleResponse temporaryScheduleResponse= getTemporaryScheduleUseCase.execute(temporaryScheduleId,userId);

        return ResponseEntity.ok(temporaryScheduleResponse);
    }

    @PatchMapping("/update")
    public ResponseEntity<TemporaryScheduleResponse> updateTemporarySchedule(
            @RequestBody UpdateTemporaryScheduleRequest updateTemporaryScheduleRequest,
            @Auth Integer userId) {

        TemporaryScheduleResponse temporaryScheduleResponse = updateTemporaryScheduleUseCase.execute(updateTemporaryScheduleRequest,userId);

        return ResponseEntity.ok(temporaryScheduleResponse);
    }

    @DeleteMapping("/{temporaryScheduleId}")
    public ResponseEntity<TemporaryScheduleResponse> updateTemporarySchedule(
            @PathVariable Integer temporaryScheduleId, @Auth Integer userId) {

        deleteTemporaryScheduleUseCase.execute(temporaryScheduleId,userId);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerScheduleFromTemporary(
            @RequestBody RegisterScheduleRequest registerScheduleRequest,
            @Auth Integer userId
    ){
        registerScheduleFromTemporaryUseCase.execute(registerScheduleRequest,userId);
        return ResponseEntity.ok().build();
    }

}
