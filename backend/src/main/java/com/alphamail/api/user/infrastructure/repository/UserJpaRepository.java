package com.alphamail.api.user.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alphamail.api.user.infrastructure.entity.UserEntity;

@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, Integer> {

	Optional<UserEntity> findByEmail(String email);

	@Query("SELECT u FROM UserEntity u " +
		"JOIN FETCH u.group g " +
		"JOIN FETCH g.companyEntity " +
		"WHERE u.userId = :userId")
	Optional<UserEntity> findByIdWithGroupAndCompany(@Param("userId") Integer userId);
}
