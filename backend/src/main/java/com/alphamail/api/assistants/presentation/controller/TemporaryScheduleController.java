package com.alphamail.api.assistants.presentation.controller;

import com.alphamail.api.assistants.application.usecase.DeleteTemporaryScheduleUseCase;
import com.alphamail.api.assistants.application.usecase.GetTemporaryScheduleUseCase;
import com.alphamail.api.assistants.application.usecase.CreateTemporaryScheduleUseCase;
import com.alphamail.api.assistants.application.usecase.UpdateTemporaryScheduleUseCase;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleRequest;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleResponse;
import com.alphamail.api.assistants.presentation.dto.UpdateTemporaryScheduleRequest;
import com.alphamail.common.constants.ApiPaths;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiPaths.ASSISTANTS_BASE_API+ApiPaths.SCHEDULE_BASE_API)
public class TemporaryScheduleController {

    private final CreateTemporaryScheduleUseCase createTemporaryScheduleUseCase;
    private final GetTemporaryScheduleUseCase getTemporaryScheduleUseCase;
    private final UpdateTemporaryScheduleUseCase updateTemporaryScheduleUseCase;
    private final DeleteTemporaryScheduleUseCase deleteTemporaryScheduleUseCase;

    @PostMapping
    public ResponseEntity<Void> addTemporarySchedule(
            @RequestBody TemporaryScheduleRequest temporaryScheduleRequest) {
        createTemporaryScheduleUseCase.execute(temporaryScheduleRequest);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{temporaryScheduleId}")
    public ResponseEntity<TemporaryScheduleResponse> getTemporarySchedule(
            @PathVariable Integer temporaryScheduleId, @AuthenticationPrincipal UserDetails userDetails) {

        TemporaryScheduleResponse temporaryScheduleResponse= getTemporaryScheduleUseCase.execute(temporaryScheduleId,1);

        return ResponseEntity.ok(temporaryScheduleResponse);
    }

    @PatchMapping("/update")
    public ResponseEntity<TemporaryScheduleResponse> updateTemporarySchedule(
            @RequestBody UpdateTemporaryScheduleRequest updateTemporaryScheduleRequest,
            @AuthenticationPrincipal UserDetails userDetails) {

        TemporaryScheduleResponse temporaryScheduleResponse= updateTemporaryScheduleUseCase.execute(updateTemporaryScheduleRequest,1);

        return ResponseEntity.ok(temporaryScheduleResponse);
    }

    @DeleteMapping("/{temporaryScheduleId}")
    public ResponseEntity<TemporaryScheduleResponse> updateTemporarySchedule(
            @PathVariable Integer temporaryScheduleId, @AuthenticationPrincipal UserDetails userDetails) {

        deleteTemporaryScheduleUseCase.execute(temporaryScheduleId,1);

        return ResponseEntity.ok().build();
    }

//    //일정이 아예 등록(기존 삭제, 넘겨주기)
//    @PostMapping("/regist/{}")
    // usecase를 가져와서 쓰기, port로?


}
