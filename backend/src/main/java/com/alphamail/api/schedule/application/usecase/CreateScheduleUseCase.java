package com.alphamail.api.schedule.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.chatbot.domain.common.VectorizableDocument;
import com.alphamail.api.chatbot.infrastructure.adapter.ScheduleVectorAdapter;
import com.alphamail.api.chatbot.infrastructure.vector.VectorUpsertClient;
import com.alphamail.api.schedule.domain.entity.Schedule;
import com.alphamail.api.schedule.domain.repository.ScheduleRepository;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CreateScheduleUseCase {

	private final ScheduleRepository scheduleRepository;
	private final VectorUpsertClient vectorUpsertClient;

	public Schedule execute(CreateScheduleRequest request, Integer userId) {

		Schedule schedule = Schedule.create(request, userId);

		Schedule saved = scheduleRepository.save(schedule);

		VectorizableDocument doc = new ScheduleVectorAdapter(saved);
		vectorUpsertClient.upsert(doc);

		return saved;
	}
}
