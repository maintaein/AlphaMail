package com.alphamail.api.erp.presentation.dto.product;

public record ModifyProductResult(
	boolean isDone,
	Status status
) {
	public enum Status {
		UPDATE_SUCCESS,
		UPDATE_FAILED,
		NOT_FOUND
	}

	public static ModifyProductResult updateSuccess() {
		return new ModifyProductResult(true, Status.UPDATE_SUCCESS);
	}

	public static ModifyProductResult updateFailed() {
		return new ModifyProductResult(false, Status.UPDATE_FAILED);
	}

	public static ModifyProductResult notFound() {
		return new ModifyProductResult(false, Status.NOT_FOUND);
	}
}
