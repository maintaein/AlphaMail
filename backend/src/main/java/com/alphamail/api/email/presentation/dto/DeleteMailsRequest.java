package com.alphamail.api.email.presentation.dto;

import java.util.List;

public record DeleteMailsRequest(
	List<Integer> mailList
) {
}
