package com.alphamail.api.assistants.application.usecase.client;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.repository.TemporaryClientRepository;
import com.alphamail.api.assistants.presentation.dto.client.RegisterClientRequest;
import com.alphamail.api.erp.application.usecase.client.RegistClientUseCase;
import com.alphamail.api.erp.presentation.dto.client.RegistClientRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j  // 로깅을 위한 어노테이션 추가
@Service
@RequiredArgsConstructor
public class RegisterTemporaryClientUseCase {

	private final TemporaryClientRepository temporaryClientRepository;
	private final RegistClientUseCase registClientUseCase;

	public void execute(RegisterClientRequest registerClientRequest, Integer userId) {
		log.info("임시 클라이언트 등록 프로세스 시작 - 임시 클라이언트 ID: {}, 사용자 ID: {}",
			registerClientRequest.TemporaryClientId(), userId);

		try {
			// 클라이언트 등록 요청 생성
			RegistClientRequest registClientRequest = registerClientRequest.toRegistClientRequest();
			log.debug("생성된 RegistClientRequest: {}", registClientRequest);

			// 정식 클라이언트로 등록
			log.info("정식 클라이언트 등록 시작");
			registClientUseCase.execute(registClientRequest);
			log.info("정식 클라이언트 등록 완료");

			// 임시 클라이언트 삭제
			log.info("임시 클라이언트 삭제 시작 - ID: {}", registerClientRequest.TemporaryClientId());
			temporaryClientRepository.deleteById(registerClientRequest.TemporaryClientId());
			log.info("임시 클라이언트 삭제 완료");

			log.info("임시 클라이언트 등록 프로세스 성공적으로 완료");
		} catch (Exception e) {
			log.error("임시 클라이언트 등록 중 오류 발생 - 임시 클라이언트 ID: {}",
				registerClientRequest.TemporaryClientId(), e);
			throw e;  // 예외 재발생
		}
	}

}