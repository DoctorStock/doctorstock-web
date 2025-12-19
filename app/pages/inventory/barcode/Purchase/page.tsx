'use client';

import { PurchaseItem, FormData } from '../data';
import clsx from 'clsx';
import styles from './page.module.css';

interface PurchaseFormProps {
  purchaseItems: PurchaseItem[];
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onPurchaseItemsChange: (items: PurchaseItem[]) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PurchaseForm({
  purchaseItems,
  formData,
  onFormDataChange,
  onPurchaseItemsChange,
  onConfirm,
  onCancel
}: PurchaseFormProps) {
  
  // 구매 항목을 수동으로 추가하는 헬퍼 함수
  const addProduct = () => {
    const newItem: PurchaseItem = {
      id: Date.now(),
      category: '의료소모품',
      productName: '',
      quantity: 1,
      unit: 'ea',
      unitPrice: 0,
      purchasePrice: 0
    };
    onPurchaseItemsChange([...purchaseItems, newItem]);
  };

  // 특정 ID의 상품을 제거
  const removeProduct = (id: number) => {
    onPurchaseItemsChange(purchaseItems.filter(item => item.id !== id));
  };

  // 상품 정보 업데이트 및 구매가 재계산
  const updateProduct = (id: number, field: string, value: string | number) => {
    const updatedItems = purchaseItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.purchasePrice = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    });
    onPurchaseItemsChange(updatedItems);
  };

  const totalPrice = purchaseItems.reduce((sum, item) => sum + item.purchasePrice, 0);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        신규 구매 요청
      </h2>

      {/* 기본 정보 입력 */}
      <div className={styles.basicInfo}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              판매처
            </label>
            <input
              type="text"
              value={formData.vendor}
              onChange={(e) => onFormDataChange({...formData, vendor: e.target.value})}
              className={styles.input}
              placeholder="판매처를 입력하세요"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFormDataChange({...formData, name: e.target.value})}
              className={styles.input}
              placeholder="이름을 입력하세요"
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            URL
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => onFormDataChange({...formData, url: e.target.value})}
            className={styles.input}
            placeholder="URL을 입력하세요"
          />
        </div>
      </div>

      {/* 구매 리스트 */}
      <div className={styles.purchaseList}>
        <div className={styles.listHeader}>
          <h3 className={styles.listTitle}>구매 리스트</h3>
          <button
            onClick={addProduct}
            className={styles.addButton}
          >
            추가하기+
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={clsx(styles.tableHeader, styles.left)}>카테고리</th>
                <th className={clsx(styles.tableHeader, styles.left)}>제품명</th>
                <th className={clsx(styles.tableHeader, styles.center)}>구매 수량</th>
                <th className={clsx(styles.tableHeader, styles.center)}>단위</th>
                <th className={clsx(styles.tableHeader, styles.right)}>단가</th>
                <th className={clsx(styles.tableHeader, styles.right)}>구매가</th>
                <th className={clsx(styles.tableHeader, styles.center)}>삭제</th>
              </tr>
            </thead>
            <tbody>
              {purchaseItems.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => updateProduct(item.id, 'category', e.target.value)}
                      className={styles.tableInput}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <input
                      type="text"
                      value={item.productName}
                      onChange={(e) => updateProduct(item.id, 'productName', e.target.value)}
                      className={styles.tableInput}
                    />
                  </td>
                  <td className={clsx(styles.tableCell, styles.center)}>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateProduct(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className={clsx(styles.tableInput, styles.small, styles.center)}
                    />
                  </td>
                  <td className={clsx(styles.tableCell, styles.center)}>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => updateProduct(item.id, 'unit', e.target.value)}
                      className={clsx(styles.tableInput, styles.tiny, styles.center)}
                    />
                  </td>
                  <td className={clsx(styles.tableCell, styles.right)}>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateProduct(item.id, 'unitPrice', parseInt(e.target.value) || 0)}
                      className={clsx(styles.tableInput, styles.medium, styles.right)}
                    />
                  </td>
                  <td className={clsx(styles.tableCell, styles.right, styles.price)}>
                    {item.purchasePrice.toLocaleString()}원
                  </td>
                  <td className={clsx(styles.tableCell, styles.center)}>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className={styles.deleteButton}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <div className={styles.totalPrice}>
            총 구매가: {totalPrice.toLocaleString()}원
          </div>
          <div className={styles.buttonGroup}>
            <button
              onClick={onCancel}
              className={clsx(styles.button, styles.cancel)}
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className={clsx(styles.button, styles.confirm)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}