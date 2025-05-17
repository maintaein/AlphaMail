package com.alphamail.api.email.infrastructure.dto;

public record EmailOCRResponseDTO(
        String licenseNum,
        String address,
        String corpName,
        String representative,
        String businessType,
        String businessItem
) {
}
