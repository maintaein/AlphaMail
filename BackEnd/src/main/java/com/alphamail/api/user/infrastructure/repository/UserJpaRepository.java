package com.alphamail.api.user.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alphamail.api.user.infrastructure.entity.UserEntity;

@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, Integer> {

}
