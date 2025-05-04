package com.alphamail.api.erp.application.dto;

public record RegistResultDto(
	boolean isDone,
	Status status,
	Integer id
) {
	public enum Status {
		SUCCESS,
		DUPLICATED,
		SAVE_FAILED,
		NOT_FOUND,
		BAD_REQUEST,
	}

	public static RegistResultDto saveSuccess(Integer id) {
		return new RegistResultDto(true, Status.SUCCESS, id);
	}

	public static RegistResultDto duplicated() {
		return new RegistResultDto(false, Status.DUPLICATED, null);
	}

	public static RegistResultDto saveFailed() {
		return new RegistResultDto(false, Status.SAVE_FAILED, null);
	}

	public static RegistResultDto notFound() {
		return new RegistResultDto(false, Status.NOT_FOUND, null);
	}

	public static RegistResultDto badRequest() {
		return new RegistResultDto(false, Status.BAD_REQUEST, null);
	}
}
