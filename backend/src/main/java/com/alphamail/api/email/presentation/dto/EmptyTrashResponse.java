package com.alphamail.api.email.presentation.dto;

public record EmptyTrashResponse(
	Integer deletedCount
) {
	public static EmptyTrashResponse of(Integer deletedCount) {
		return new EmptyTrashResponse(deletedCount);
	}
}
