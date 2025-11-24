'use client';

// 메인 페이지
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BarcodeScanner from './Barcode/page';
import PurchaseForm from './Purchase/page';
import { PurchaseItem, FormData, initialPurchaseItems, initialFormData } from './data';
import styles from './page.module.css';

// 바코드 스캔 및 구매 요청 페이지 컴포넌트
export default function BarcodePage() {
  const router = useRouter();
  
  // 구매 아이템 목록 상태 관리
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>(initialPurchaseItems);
  // 구매 요청 폼 데이터 상태 관리
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // 바코드 스캔 완료 시 호출되는 핸들러
  const handleBarcodeScanned = (barcode: string) => {
    // 현재는 더미 데이터로 처리
    const newItem: PurchaseItem = {
      id: Date.now(),
      category: '의료소모품',
      productName: `상품_${barcode.slice(-4)}`, // 바코드 마지막 4자리로 상품명 생성
      quantity: 1,
      unit: 'ea',
      unitPrice: 1000,
      purchasePrice: 1000
    };
    
    // 기존 목록에 새 아이템 추가
    setPurchaseItems([...purchaseItems, newItem]);
  };

  // 구매 요청 확인 버튼
  const handleConfirm = () => {
    console.log('구매 요청 처리:', { formData, purchaseItems });
    alert('구매 요청이 처리되었습니다!');
  };

  // 취소 버튼
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* 왼쪽: 바코드 스캔 컴포넌트 */}
        <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
        
        {/* 오른쪽: 구매 폼 컴포넌트 */}
        <PurchaseForm
          purchaseItems={purchaseItems}
          formData={formData}
          onFormDataChange={setFormData}
          onPurchaseItemsChange={setPurchaseItems}
          onAddProductFromBarcode={handleBarcodeScanned}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}