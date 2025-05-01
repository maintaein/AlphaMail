package com.alphamail.api.email.presentation.dto;

import java.util.List;

public record EmailListResponse(
	List<EmailResponse> emails,
	Integer totalCount,
	Integer readCount,
	Integer pageCount,
	Integer currentPage
) {
}
