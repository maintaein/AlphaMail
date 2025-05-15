package com.alphamail.api.chatbot.infrastructure.adapter;

import java.util.Map;

import com.alphamail.api.chatbot.domain.common.VectorizableDocument;
import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.schedule.domain.entity.Schedule;

public class ScheduleVectorAdapter implements VectorizableDocument {

	private final Schedule schedule;

	public ScheduleVectorAdapter(Schedule schedule) {
		this.schedule = schedule;
	}

	@Override
	public String toVectorText() {
		return """
			일정 제목: %s
			설명: %s
			시작: %s
			종료: %s
			완료 여부: %s
			""".formatted(
			schedule.getName(),
			schedule.getDescription(),
			schedule.getStartTime(),
			schedule.getEndTime(),
			schedule.getIsDone() ? "완료" : "미완료"
		);
	}

	@Override
	public Map<String, Object> toMetadata() {
		return Map.of(
			"owner_id", schedule.getUserId(),
			"owner_type", "user",
			"user_id", schedule.getUserId(),
			"document_type", getDocumentType(),
			"domain_id", schedule.getScheduleId()
		);
	}

	@Override
	public String getId() {
		return String.valueOf(schedule.getScheduleId());
	}

	@Override
	public String getDocumentType() {
		return DocumentTypes.SCHEDULE;
	}
}
