package com.alphamail.api.assistants.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemporaryItemDto {

	private Integer id;
	private TemporaryItemType type;
	private LocalDateTime createdAt;
	private String title;
	private Integer userId;
	private String userName;

	public enum TemporaryItemType {
		PURCHASE_ORDER, QUOTE, CLIENT, SCHEDULE
	}

	// 네이티브 쿼리 결과를 변환하기 위한 정적 팩토리 메서드
	public static TemporaryItemDto fromQueryResult(Object[] result) {
		Integer id = ((Number) result[0]).intValue();
		TemporaryItemType type = TemporaryItemType.valueOf((String) result[1]);
		LocalDateTime createdAt = ((Timestamp) result[2]).toLocalDateTime();
		String title = (String) result[3];
		Integer userId = ((Number) result[4]).intValue();

		return TemporaryItemDto.builder()
			.id(id)
			.type(type)
			.createdAt(createdAt)
			.title(title)
			.userId(userId)
			.build();
	}

}