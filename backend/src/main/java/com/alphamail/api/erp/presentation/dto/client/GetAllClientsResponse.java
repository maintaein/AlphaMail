package com.alphamail.api.erp.presentation.dto.client;

import com.alphamail.api.erp.domain.entity.Client;

public record GetAllClientsResponse(
	Integer id,
	String corpName,
	String representative,
	String licenseNumber,
	String phoneNumber,
	String email,
	String address
) {
	public static GetAllClientsResponse from(Client client) {
		return new GetAllClientsResponse(
			client.getClientId(),
			client.getCorpName(),
			client.getRepresentative(),
			client.getLicenseNum(),
			client.getPhoneNum(),
			client.getEmail(),
			client.getAddress()
		);
	}
}
