// 바코드 스캔 응답 타입 정의
export interface BarcodeItem {
  meaClassNo: string;        // 의료기기분류번호 (예: B03010.01)
  packQuantity: number;      // 포장수량
  brandName: string;         // 브랜드명 (예: Hintermann Series)
  useItemSeq: boolean;       // 품목일련번호 사용 여부
  meddevItemSeq: number;     // 의료기기 품목 일련번호
  typeName: string;          // 제품명/타입명 (예: Talar Implant 302112)
  permitNo: string;          // 허가번호 (예: 수허 02-1233 호)
  useTimeLimit: boolean;     // 사용기한 사용 여부
  itemName: string;          // 품목명 (예: 인공발목관절)
  udiDiSeq: number;          // UDI-DI 일련번호
  entpName: string;          // 업체명 (예: (주)이건메디칼)
  udiDiCode: string;         // UDI-DI 코드 (예: +B0953021121)
  useManufYm: boolean;       // 제조년월 사용 여부
  grade: string;             // 등급 (예: 3)
  cobTypeName: string;       // 업체형태 (예: 수입업)
  useLotNo: boolean;         // 로트번호 사용 여부
  seq: number;               // 순번
  userSterilizationYn: boolean; // 사용자 멸균 여부
  kitYn: boolean;           // 키트 여부
}

// 바코드 API 응답 타입
export interface BarcodeResponse {
  items: BarcodeItem[];  // 바코드 아이템 배열
}

// 구매 아이템 타입 (UI에서 사용)
export interface PurchaseItem {
  id: number;                    // 고유 ID (자동 생성)
  category: string;             // 카테고리 (예: 의료기기, 의료소모품)
  productName: string;          // 제품명
  quantity: number;             // 구매 수량
  unit: string;                 // 단위 (예: ea, box, set)
  unitPrice: number;            // 단가 (원)
  purchasePrice: number;        // 총 구매가 (수량 × 단가)
  
  // 바코드 원본 데이터 (참조용)
  barcodeData?: BarcodeItem;
}

// 구매 요청 폼 데이터 타입
export interface FormData {
  vendor: string;    // 판매처/공급업체명
  name: string;      // 담당자명
  url: string;       // 관련 URL (선택사항)
}

/**
 * 바코드 데이터를 구매 아이템으로 변환하는 함수
 * @param barcodeItem - 바코드 스캔으로 얻은 원본 데이터
 * @returns 구매 아이템 객체
 */
export const convertBarcodeItemToPurchaseItem = (barcodeItem: BarcodeItem): PurchaseItem => {
  return {
    id: Date.now(),  // 현재 시간을 ID로 사용 (고유성 보장)
    
    // 카테고리: 의료기기분류번호를 카테고리로 사용
    category: barcodeItem.meaClassNo || '의료기기',
    
    // 제품명: 품목명 → 제품명 순으로 우선순위
    productName: barcodeItem.itemName || barcodeItem.typeName || '상품명 없음',
    
    // 수량: 포장수량 사용
    quantity: barcodeItem.packQuantity || 1,
    
    unit: 'ea',  // 기본 단위
    unitPrice: 0,  // 가격 정보는 별도 조회 필요 (공급업체 API 등)
    purchasePrice: 0,  // 수량 × 단가로 자동 계산됨
    
    // 원본 바코드 데이터 보관 (나중에 참조 가능)
    barcodeData: barcodeItem
  };
};

// 초기 구매 아이템 더미 데이터
export const initialPurchaseItems: PurchaseItem[] = [
  { 
    id: 1, 
    category: '의료소모품', 
    productName: 'aaaa', 
    quantity: 12, 
    unit: 'ea', 
    unitPrice: 1000, 
    purchasePrice: 12000 
  },
  { 
    id: 2, 
    category: '의료소모품', 
    productName: 'rrrrr', 
    quantity: 12, 
    unit: 'ea', 
    unitPrice: 1000, 
    purchasePrice: 12000 
  },
  { 
    id: 3, 
    category: '의료소모품', 
    productName: 'ddda', 
    quantity: 12, 
    unit: 'ea', 
    unitPrice: 1000, 
    purchasePrice: 12000 
  }
];

// 구매 요청 초기 폼 데이터
export const initialFormData: FormData = {
  vendor: '',  // 판매처명
  name: '',    // 담당자명
  url: ''      // 관련 URL
};