package com.alphamail.api.email.domain.entity;

import com.alphamail.api.assistants.presentation.dto.client.TemporaryClientRequest;
import com.alphamail.api.email.infrastructure.dto.EmailOCRResponseDTO;

public record EmailOCR(
        String licenseNum,
        String address,
        String corpName,
        String representative,
        String businessType,
        String businessItem,
        Boolean success

) {

    public static EmailOCR from(EmailOCRResponseDTO emailOCRResponseDTO) {
        return new EmailOCR(
                emailOCRResponseDTO.licenseNum(),
                emailOCRResponseDTO.address(),
                emailOCRResponseDTO.corpName(),
                emailOCRResponseDTO.representative(),
                emailOCRResponseDTO.businessType(),
                emailOCRResponseDTO.businessItem(),
                emailOCRResponseDTO.licenseNum()!=null
                || emailOCRResponseDTO.address()!=null
                || emailOCRResponseDTO.corpName()!=null
                || emailOCRResponseDTO.representative()!=null
                || emailOCRResponseDTO.businessType()!=null
                || emailOCRResponseDTO.businessItem()!=null
        );
    }

    public static TemporaryClientRequest toTemporaryClientRequest(EmailOCR emailOCR, Integer emailId, String emailSender, String businessLicense ) {

        return new TemporaryClientRequest(
                emailOCR.licenseNum,
                emailOCR.address,
                emailOCR.corpName,
                emailOCR.representative,
                emailOCR.businessType,
                emailOCR.businessItem,
                emailSender,
                businessLicense,
                emailId
        );


    }
}
