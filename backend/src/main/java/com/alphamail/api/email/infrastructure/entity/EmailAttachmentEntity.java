package com.alphamail.api.email.infrastructure.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "email_attachments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EmailAttachmentEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer emailAttachmentId;

	@JoinColumn(name = "email_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private EmailEntity email;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String S3Key;

	//Integer보다 Long이 괜찮을 것 같아서 변경
	@Column(nullable = false)
	private Long size;

	//File의 유형..?
	@Column(nullable = false)
	private String type;
}
// UserId필요없어서 지움!
