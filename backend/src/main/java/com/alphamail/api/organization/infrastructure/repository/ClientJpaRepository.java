package com.alphamail.api.organization.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alphamail.api.organization.infrastructure.entity.ClientEntity;

@Repository
public interface ClientJpaRepository extends JpaRepository<ClientEntity, Integer> {
}
