package com.alphamail.api.assistants.domain.service;

import com.alphamail.api.email.domain.entity.EmailAttachment;

import java.util.List;

public interface EmailAttachmentReader {

    List<EmailAttachment> findAllByEmailId(Integer emailId);
}
