export function useProductUse() {
  const handleUse = (productId: string) => {
    // TODO: 사용 다이얼로그 열기
    console.log('제품 사용:', productId);
  };

  return { handleUse };
}

