package com.alphamail.api.assistants.presentation.controller;


import com.alphamail.api.assistants.application.usecase.SaveVectorDBUseCase;
import com.alphamail.api.assistants.application.usecase.TemporaryScheduleUseCase;
import com.alphamail.api.assistants.presentation.dto.SendEmailRequest;
import com.alphamail.api.assistants.presentation.dto.TemporaryScheduleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AssistantsController {

     /*
1. 이메일 들어올 경우, 이메일 나갈 경우에 대해서 모두 VECTORDB와 연결 (email 쪽 하고 연결 되어야함)
2. mcp 아래 받고, 형태에 따라서 db에 저장해주기
발주 요청  : localhost:8080/api/erp/pruchase-orders
일정 요청 : localhost:8080/api/schedule
견적서 요청 : localhost:8080/api/erp/estimate
3. 각각에 대해서 수정될 경우
4. 각각에 대해서 삭제 될 경우
5. 이메일 요약 요청시
6. 이메일 초안 작성시
7. ocr의 경우는 !?!? + 첨부파일 어떻게 처리 할건지
8. mcp 리스트 전달
9. mcp 각 요소에 대해서 전달
      */

     private final SaveVectorDBUseCase saveVectorDBUseCase;
     private final TemporaryScheduleUseCase temporaryScheduleUseCase;


     @PostMapping("/vectordb/test")
     public ResponseEntity<Void> saveVectorCB(@RequestBody SendEmailRequest sendEmailRequest, @AuthenticationPrincipal UserDetails userDetails) {

          saveVectorDBUseCase.execute("thread_id_001",1,sendEmailRequest.bodyText());

          return ResponseEntity.ok().build();
     }


     @PostMapping("/schedule")
     public ResponseEntity<Boolean> registTemporarySchedule(@RequestBody TemporaryScheduleRequest temporaryScheduleRequest) {

          // 받은 값이 ISO-8601 형식이 아닐 경우에 대한 처리 해줘야함
          // userId는 그래서 어케 받지??
          temporaryScheduleUseCase.create(temporaryScheduleRequest, 1);

          return ResponseEntity.ok().build();
     }

}
