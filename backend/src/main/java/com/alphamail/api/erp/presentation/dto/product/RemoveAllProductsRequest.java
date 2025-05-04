package com.alphamail.api.erp.presentation.dto.product;

import java.util.List;

public record RemoveAllProductsRequest(
	List<Integer> ids
) {
}
