package com.alphamail.api.assistants.infrastructure.repository.assistant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alphamail.api.user.infrastructure.entity.UserEntity;

@Repository
public interface TemporaryItemRepository extends JpaRepository<UserEntity, Integer> {
	@Query(value =
		"SELECT id, 'PURCHASE_ORDER' as type, created_at as createdAt, title, user_id as userId, CAST(NULL AS INTEGER) as email_id "
			+
			"FROM temporary_purchase_order " +
			"WHERE user_id = :userId " +
			"UNION ALL " +
			"SELECT id, 'QUOTE' as type, created_at as createdAt, title, user_id as userId, CAST(NULL AS INTEGER) as email_id "
			+
			"FROM temporary_quote " +
			"WHERE user_id = :userId " +
			"UNION ALL " +
			"SELECT id, 'CLIENT' as type, created_at as createdAt, corp_name as title, user_id as userId, email_id " +
			"FROM temporary_client " +
			"WHERE user_id = :userId " +
			"UNION ALL " +
			"SELECT id, 'SCHEDULE' as type, created_at as createdAt, name as title, user_id as userId, CAST(NULL AS INTEGER) as email_id "
			+
			"FROM temporary_schedule " +
			"WHERE user_id = :userId " +
			"ORDER BY createdAt DESC",
		nativeQuery = true)
	List<Object[]> findAllTemporaryItemsByUserId(@Param("userId") Integer userId);
}