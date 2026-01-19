export function useAddToCart() {
  const handleAddToCart = async (productId: string) => {
    // TODO: 서버 통신 구현
    // await addToCartAPI(productId);
    console.log('카트 담기:', productId);
  };

  return { handleAddToCart };
}

