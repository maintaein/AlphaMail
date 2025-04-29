package com.alphamail.common.handler;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class FailResponse {


	String message;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	List<FieldErrorDetail> errors;

	public static FailResponse fail( String message) {
		return FailResponse.builder()

			.message(message)
			.build();
	}

	public static FailResponse failWithFieldErrors( String message, List<FieldErrorDetail> errors) {
		return FailResponse.builder()

			.message(message)
			.errors(errors)
			.build();
	}
}