package com.alphamail.api.assistants.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alphamail.api.assistants.infrastructure.entity.TemporaryClientEntity;

public interface TemporaryClientJpaRepository extends JpaRepository<TemporaryClientEntity, Integer> {
}
