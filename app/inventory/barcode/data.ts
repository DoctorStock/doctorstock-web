// 바코드 스캔 응답 타입 정의
export interface BarcodeItem {
  meaClassNo: string;
  packQuantity: number;
  brandName: string;
  useItemSeq: boolean;
  meddevItemSeq: number;
  typeName: string;
  permitNo: string;
  useTimeLimit: boolean;
  itemName: string;
  udiDiSeq: number;
  entpName: string;
  udiDiCode: string;
  useManufYm: boolean;
  grade: string;
  cobTypeName: string;
  useLotNo: boolean;
  seq: number;
  userSterilizationYn: boolean;
  kitYn: boolean;
}

export interface BarcodeResponse {
  items: BarcodeItem[];
}

// 구매 아이템 타입 (UI에서 사용)
export interface PurchaseItem {
  id: number;
  category: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  purchasePrice: number;
  // 바코드 데이터 추가
  barcodeData?: BarcodeItem;
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
