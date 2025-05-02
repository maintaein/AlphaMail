import { Product } from '../../../types/product';
import { ProductTableRow } from '../molecules/productTableRow';
import { Pagination } from '../molecules/pagination';
import { usePagedProducts } from '../../../hooks/usePagedProducts';

interface ProductTableProps {
  companyId: number;
  onProductClick?: (product: Product) => void;
  onSelectProduct?: (id: number) => void;
  selectedProductIds?: Set<number>;
  searchQuery?: string;
}

export const ProductTable: React.FC<ProductTableProps> = ({ 
  companyId, 
  onProductClick,
  onSelectProduct,
  selectedProductIds = new Set(),
  searchQuery = ''
}) => {
  const {
    products,
    totalCount,
    pageCount,
    currentPage,
    pageSize,
    sortOption,
    isLoading,
    error,
    handlePageChange,
    handleSizeChange,
    handleSortChange
  } = usePagedProducts({
    companyId,
    initialPage: 1,
    initialSize: 10,
    initialSort: 0,
    searchQuery
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  console.log('Products in Table:', products);

  // products가 배열인지 확인
  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return <div>데이터 형식이 올바르지 않습니다.</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <select
            value={pageSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => handleSortChange(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={0}>최신순</option>
            <option value={1}>이름순</option>
            <option value={2}>재고순</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          총 {totalCount}개의 상품
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">선택</th>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">품목명</th>
              <th className="p-4 text-center">규격</th>
              <th className="p-4 text-center">재고</th>
              <th className="p-4 text-right">매입가</th>
              <th className="p-4 text-right">판매가</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => {
                console.log('Rendering product:', product);
                return (
                  <ProductTableRow
                    key={product.id}
                    product={{
                      ...product,
                      isSelected: selectedProductIds.has(product.id)
                    }}
                    onSelect={onSelectProduct || (() => {})}
                    onProductClick={onProductClick}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  상품이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}; 