package com.alphamail.common.config;

import org.springframework.context.annotation.Configuration;

import com.alphamail.common.formatter.P6SpyFormatter;
import com.p6spy.engine.spy.P6SpyOptions;
import jakarta.annotation.PostConstruct;

/**
 * P6Spy 설정 클래스
 * SQL 쿼리 로깅을 위한 P6Spy 관련 설정을 담당합니다.
 */
@Configuration
public class P6SpyConfig {

	@PostConstruct
	public void setLogMessageFormat() {
		// 로그 포맷터 설정
		P6SpyOptions.getActiveInstance().setLogMessageFormat(P6SpyFormatter.class.getName());


	}
}