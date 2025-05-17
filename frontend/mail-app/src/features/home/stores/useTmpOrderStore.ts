import { create } from 'zustand';

interface OrderItem {
  id: number;
  name: string;
  spec: string;
  quantity: string;
  price: string;
  tax: string;
  total: string;
}

interface TmpOrderState {
  // 기본 정보
  orderNo: string;
  orderDate: string;
  clientName: string; 
  licenseNumber: string;
  representative: string;
  businessType: string;
  businessItem: string;
  manager: string;
  managerContact: string;
  address: string;
  deliveryDate: string;
  paymentTerm: string;
  
  // 품목 정보
  items: OrderItem[];
  
  // 액션
  setOrderNo: (value: string) => void;
  setOrderDate: (value: string) => void;
  setClientName: (value: string) => void;
  setLicenseNumber: (value: string) => void;
  setRepresentative: (value: string) => void;
  setBusinessType: (value: string) => void;
  setBusinessItem: (value: string) => void;
  setManager: (value: string) => void;
  setManagerContact: (value: string) => void;
  setAddress: (value: string) => void;
  setDeliveryDate: (value: string) => void;
  setPaymentTerm: (value: string) => void;
  
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, field: keyof OrderItem, value: string) => void;
  setItemName: (id: number, name: string) => void;
  
  // 계산
  getTotalAmount: () => number;
  reset: () => void;
}

// 초기 상태
const initialItems: OrderItem[] = [
  { id: 1, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
  { id: 2, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
  { id: 3, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
];

// 현재 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 발주서 번호 생성 함수
const generateOrderNo = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PO-${year}${month}${day}-${random}`;
};

export const useTmpOrderStore = create<TmpOrderState>((set, get) => ({
  // 기본 정보 초기값
  orderNo: generateOrderNo(),
  orderDate: getCurrentDate(),
  clientName: '',
  licenseNumber: '',
  representative: '',
  businessType: '',
  businessItem: '',
  manager: '',
  managerContact: '',
  address: '',
  deliveryDate: '',
  paymentTerm: '',
  
  // 품목 정보 초기값
  items: initialItems,
  
  // 액션 구현
  setOrderNo: (value) => set({ orderNo: value }),
  setOrderDate: (value) => set({ orderDate: value }),
  setClientName: (value) => set({ clientName: value }),
  setLicenseNumber: (licenseNumber) => set({ licenseNumber: licenseNumber }),
  setRepresentative: (representative) => set({ representative: representative }),
  setBusinessType: (businessType) => set({ businessType: businessType }),
  setBusinessItem: (businessItem) => set({ businessItem: businessItem }),
  setManager: (manager) => set({ manager: manager }),
  setManagerContact: (managerContact) => set({ managerContact: managerContact }),
  setAddress: (address) => set({ address: address }),
  setDeliveryDate: (deliveryDate) => set({ deliveryDate: deliveryDate }),
  setPaymentTerm: (paymentTerm) => set({ paymentTerm: paymentTerm }),
  
  addItem: () => set((state) => {
    const newId = state.items.length > 0 
      ? Math.max(...state.items.map(item => item.id)) + 1 
      : 1;
    return { 
      items: [...state.items, { id: newId, name: '', spec: '', quantity: '', price: '', tax: '', total: '' }] 
    };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  updateItem: (id, field, value) => set((state) => {
    const updatedItems = state.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // 수량이 변경된 경우 세액과 합계 재계산
        if (field === 'quantity') {
          const quantity = parseInt(value) || 0;
          const price = parseInt(item.price.replace(/,/g, '')) || 0;
          
          const tax = Math.round(price * quantity * 0.1);
          const total = price * quantity;
          
          updatedItem.tax = tax.toLocaleString();
          updatedItem.total = total.toLocaleString();
        }
        
        return updatedItem;
      }
      return item;
    });
    
    return { items: updatedItems };
  }),
  
  setItemName: (id, name) => set((state) => {
    const updatedItems = state.items.map(item => {
      if (item.id === id) {
        // 품목 선택 시 규격과 단가 자동 설정 (실제로는 API에서 가져올 값)
        return { 
          ...item, 
          name, 
          spec: '1EA', 
          price: '90,000',
          quantity: item.quantity || '1',
          tax: '9,000',
          total: '90,000'
        };
      }
      return item;
    });
    
    return { items: updatedItems };
  }),
  
  getTotalAmount: () => {
    const { items } = get();
    return items.reduce((sum, item) => {
      const total = parseInt(item.total.replace(/,/g, '')) || 0;
      return sum + total;
    }, 0);
  },
  
  reset: () => set({
    orderNo: generateOrderNo(),
    orderDate: getCurrentDate(),
    clientName: '',
    licenseNumber: '',
    representative: '',
    businessType: '',
    businessItem: '',
    manager: '',
    managerContact: '',
    address: '',
    deliveryDate: '',
    paymentTerm: '',
    items: initialItems
  })
}));