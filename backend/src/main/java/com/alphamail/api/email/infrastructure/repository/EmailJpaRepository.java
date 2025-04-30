package com.alphamail.api.email.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alphamail.api.email.infrastructure.entity.EmailEntity;

public interface EmailJpaRepository extends JpaRepository<EmailEntity, Integer> {
}
