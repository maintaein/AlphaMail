package com.alphamail.api.global.dto;

import java.util.List;

public record RemoveAllErpRequest(
	List<Integer> ids
) {
}
