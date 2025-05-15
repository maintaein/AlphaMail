package com.alphamail.api.email.domain.port;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailAttachment;

public interface EmailSenderPort {

	String send(Email email, List<MultipartFile> multipartFiles);
}
