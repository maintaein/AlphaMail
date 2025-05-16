package com.alphamail.api.assistants.infrastructure.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_email_template_field")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailTemplateFieldEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "template_id", nullable = false)
	private EmailTemplateEntity template;

	@Column(name = "field_name")
	private String fieldName;

	@Column(name = "field_value", columnDefinition = "TEXT")
	private String fieldValue;

	@Column(name = "display_order")
	private Integer displayOrder; // 표시 순서 필드 추가
}