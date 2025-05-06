package com.alphamail.api.erp.domain.service;

import com.alphamail.api.organization.domain.entity.Client;

public interface ClientReader {
	Client findById(Integer clientId);
}
