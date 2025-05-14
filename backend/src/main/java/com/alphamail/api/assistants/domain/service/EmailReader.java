package com.alphamail.api.assistants.domain.service;

import com.alphamail.api.email.domain.entity.Email;


public interface EmailReader {
    Email findByIdAndUserId(Integer emailId, Integer userId);
}
