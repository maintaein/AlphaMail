package com.alphamail.api.organization.infrastructure.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.alphamail.api.erp.infrastructure.entity.ClientEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "companies")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@OneToMany(mappedBy = "companyEntity", fetch = FetchType.LAZY)
	private List<GroupEntity> groups;

	@OneToMany(mappedBy = "companyEntity", fetch = FetchType.LAZY)
	private List<ClientEntity> clients;
}
