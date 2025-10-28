export interface PurchaseItem {
  id: number;
  category: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  purchasePrice: number;
}

export interface FormData {
  vendor: string;
  name: string;
  url: string;
}

// example data
export const initialPurchaseItems: PurchaseItem[] = [
  { id: 1, category: '의료소모품', productName: 'aaaa', quantity: 12, unit: 'ea', unitPrice: 1000, purchasePrice: 12000 },
  { id: 2, category: '의료소모품', productName: 'rrrrr', quantity: 12, unit: 'ea', unitPrice: 1000, purchasePrice: 12000 },
  { id: 3, category: '의료소모품', productName: 'ddda', quantity: 12, unit: 'ea', unitPrice: 1000, purchasePrice: 12000 }
];

export const initialFormData: FormData = {
  vendor: '',
  name: '',
  url: ''
};
