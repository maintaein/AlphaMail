package com.alphamail.api.global.dto;

import java.util.List;

import org.springframework.data.domain.Page;

public record GetPageResponse<T>(
	List<T> contents,
	Long totalCount, // 검색 결과에 대한 전체 개수
	Integer pageCount, // 전체 페이지 수
	Integer currentPage // 현재 페이지
) {
	public static <T> GetPageResponse<T> from(Page<T> page) {
		return new GetPageResponse<>(
			page.getContent(),
			page.getTotalElements(),
			page.getTotalPages(),
			page.getPageable().getPageNumber()
		);
	}
}
