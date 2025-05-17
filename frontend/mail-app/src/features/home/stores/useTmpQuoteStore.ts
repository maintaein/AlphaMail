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

interface TmpQuoteStore {
  // 견적서 기본 정보
  quoteNo: string;
  quoteDate: string;
  clientName: string;
  licenseNumber: string;
  representative: string;
  businessType: string;
  businessItem: string;
  address: string;
  manager: string;
  managerContact: string;
  validityPeriod: string;
  deliveryDate: string;
  
  // 품목 목록
  items: OrderItem[];
  
  // 액션
  setClientName: (name: string) => void;
  setLicenseNumber: (licenseNumber: string) => void;
  setRepresentative: (representative: string) => void;
  setBusinessType: (businessType: string) => void;
  setBusinessItem: (businessItem: string) => void;
  setAddress: (address: string) => void;
  setManager: (manager: string) => void;
  setManagerContact: (managerContact: string) => void;
  setValidityPeriod: (validityPeriod: string) => void;
  setDeliveryDate: (deliveryDate: string) => void;
  
  // 품목 관련 액션
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, field: keyof Omit<OrderItem, 'id'>, value: string) => void;
  setItemName: (id: number, name: string) => void;
  
  // 합계 계산
  getTotalAmount: () => number;
  
  // 초기화
  reset: () => void;
}

// 현재 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 견적서 번호 생성 함수
const generateQuoteNo = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `QT-${year}${month}${day}-${random}`;
};

export const useTmpQuoteStore = create<TmpQuoteStore>((set, get) => ({
  // 초기 상태
  quoteNo: generateQuoteNo(),
  quoteDate: getCurrentDate(),
  clientName: '',
  licenseNumber: '',
  representative: '',
  businessType: '',
  businessItem: '',
  address: '',
  manager: '',
  managerContact: '',
  validityPeriod: '견적일로부터 30일',
  deliveryDate: '',
  
  items: [
    { id: 1, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
    { id: 2, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
    { id: 3, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
    { id: 4, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
  ],
  
  // 액션
  setClientName: (name) => set({ clientName: name }),
  setLicenseNumber: (licenseNumber) => set({ licenseNumber: licenseNumber }),
  setRepresentative: (representative) => set({ representative: representative }),
  setBusinessType: (businessType) => set({ businessType: businessType }),
  setBusinessItem: (businessItem) => set({ businessItem: businessItem }),
  setAddress: (address) => set({ address: address }),
  setManager: (manager) => set({ manager: manager }),
  setManagerContact: (managerContact) => set({ managerContact: managerContact }),
  setValidityPeriod: (validityPeriod) => set({ validityPeriod: validityPeriod }),
  setDeliveryDate: (deliveryDate) => set({ deliveryDate: deliveryDate }),
  
  // 품목 관련 액션
  addItem: () => {
    const { items } = get();
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    set({ items: [...items, { id: newId, name: '', spec: '', quantity: '', price: '', tax: '', total: '' }] });
  },
  
  removeItem: (id) => {
    const { items } = get();
    set({ items: items.filter(item => item.id !== id) });
  },
  
  updateItem: (id, field, value) => {
    const { items } = get();
    set({
      items: items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  },
  
  setItemName: (id, name) => {
    const { updateItem } = get();
    updateItem(id, 'name', name);
  },
  
  // 합계 계산
  getTotalAmount: () => {
    const { items } = get();
    return items.reduce((sum, item) => {
      const total = parseInt(item.total.replace(/,/g, '')) || 0;
      return sum + total;
    }, 0);
  },
  
  // 초기화
  reset: () => {
    set({
      quoteNo: generateQuoteNo(),
      quoteDate: getCurrentDate(),
      clientName: '',
      licenseNumber: '',
      representative: '',
      businessType: '',
      businessItem: '',
      address: '',
      manager: '',
      managerContact: '',
      validityPeriod: '견적일로부터 30일',
      deliveryDate: '',
      items: [
        { id: 1, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
        { id: 2, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
        { id: 3, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
        { id: 4, name: '', spec: '', quantity: '', price: '', tax: '', total: '' },
      ],
    });
  },
}));