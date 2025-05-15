package com.alphamail.api.assistants.domain.service;

import com.alphamail.api.erp.domain.entity.Product;

public interface ProductReader {
    Product findById(Integer productId);
}
