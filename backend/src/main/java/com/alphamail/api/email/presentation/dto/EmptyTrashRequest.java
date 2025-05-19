package com.alphamail.api.email.presentation.dto;

import java.util.List;

public record EmptyTrashRequest(
	List<Integer> mailIds
) {
}
