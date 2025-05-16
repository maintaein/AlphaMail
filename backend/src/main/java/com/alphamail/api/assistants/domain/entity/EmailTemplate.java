package com.alphamail.api.assistants.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmailTemplate {

	private Integer id;
	private Integer userId;
	private String title;
	private String context;
}
