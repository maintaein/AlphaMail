package com.alphamail.api.organization.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alphamail.api.organization.infrastructure.entity.CompanyEntity;

public interface CompanyJpaRepository extends JpaRepository<CompanyEntity, Integer> {
}
