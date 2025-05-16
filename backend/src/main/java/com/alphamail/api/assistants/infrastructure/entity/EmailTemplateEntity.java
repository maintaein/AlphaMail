package com.alphamail.api.assistants.infrastructure.entity;

import java.util.ArrayList;
import java.util.List;

import com.alphamail.api.user.infrastructure.entity.UserEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_email_template")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailTemplateEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@Column(name = "title")
	private String title;

	@Column(name = "context", columnDefinition = "TEXT")
	private String context;

	@OneToMany(mappedBy = "template", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default
	private List<EmailTemplateFieldEntity> fields = new ArrayList<>();

	public void addField(EmailTemplateFieldEntity field) {
		if (this.fields == null) {
			this.fields = new ArrayList<>();
		}
		field.setTemplate(this);
		this.fields.add(field);
	}
}