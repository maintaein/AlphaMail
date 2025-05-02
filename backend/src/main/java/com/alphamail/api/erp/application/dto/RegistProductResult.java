package com.alphamail.api.erp.application.dto;

public record RegistProductResult(
	boolean isDone,
	Status status,
	Integer id
) {
	public enum Status {
		SUCCESS,
		DUPLICATED,
		SAVE_FAILED,
		NOT_FOUND,
	}

	public static RegistProductResult saveSuccess(Integer id) {
		return new RegistProductResult(true, Status.SUCCESS, id);
	}

	public static RegistProductResult duplicated() {
		return new RegistProductResult(false, Status.DUPLICATED, null);
	}

	public static RegistProductResult saveFailed() {
		return new RegistProductResult(false, Status.SAVE_FAILED, null);
	}

	public static RegistProductResult notFound() {
		return new RegistProductResult(false, Status.NOT_FOUND, null);
	}
}
