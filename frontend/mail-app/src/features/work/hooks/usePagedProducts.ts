import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService';
import { ProductResponse } from '../types/product';
import { useState } from 'react';

interface UsePagedProductsOptions {
  initialPage?: number;
  initialSize?: number;
  initialSort?: number;
  companyId: number;
}

export const usePagedProducts = (options: UsePagedProductsOptions) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(options.initialPage || 1);
  const [pageSize, setPageSize] = useState<number>(options.initialSize || 10);
  const [sortOption, setSortOption] = useState<number>(options.initialSort || 0);

  console.log('Hook Initialized with options:', options);
  console.log('Current state:', {
    searchQuery,
    currentPage,
    pageSize,
    sortOption
  });

  const { data, isLoading, error, refetch } = useQuery<ProductResponse>({
    queryKey: ['products', options.companyId, currentPage, pageSize, searchQuery, sortOption],
    queryFn: async () => {
      console.log('Fetching products with params:', {
        companyId: options.companyId,
        searchQuery,
        currentPage,
        pageSize,
        sortOption
      });

      const params = {
        companyId: options.companyId,
        ...(searchQuery && { query: searchQuery }),
        page: currentPage,
        size: pageSize,
        sort: sortOption
      };

      try {
        const response = await productService.getProducts(params);
        console.log('API Response:', response);
        console.log('Response items:', response.contents);
        console.log('Response items type:', typeof response.contents);
        console.log('Response items is array:', Array.isArray(response.contents));
        return response;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    placeholderData: (previousData) => previousData,
    staleTime: 30000, // 30초 동안 데이터를 신선한 상태로 유지
  });

  const handleSearch = (query: string) => {
    console.log('Search query changed:', query);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed:', page);
    setCurrentPage(page);
  };

  const handleSizeChange = (size: number) => {
    console.log('Page size changed:', size);
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: number) => {
    console.log('Sort option changed:', sort);
    setSortOption(sort);
    setCurrentPage(1);
  };

  // 데이터가 없을 때 빈 배열 반환
  const products = data?.contents || [];

  return {
    products,
    totalCount: data?.total_count || 0,
    pageCount: data?.page_count || 0,
    currentPage,
    pageSize,
    sortOption,
    searchQuery,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    handleSizeChange,
    handleSortChange,
    refetch
  };
};
