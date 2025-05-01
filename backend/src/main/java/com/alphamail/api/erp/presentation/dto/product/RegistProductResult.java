package com.alphamail.api.erp.presentation.dto.product;

public record RegistProductResult(
	boolean isDone,
	Status status
) {
	public enum Status {
		SUCCESS,
		DUPLICATED,
		SAVE_FAILED,
	}

	public static RegistProductResult saveSuccess() {
		return new RegistProductResult(true, Status.SUCCESS);
	}

	public static RegistProductResult duplicated() {
		return new RegistProductResult(false, Status.DUPLICATED);
	}

	public static RegistProductResult saveFailed() {
		return new RegistProductResult(false, Status.SAVE_FAILED);
	}

}
