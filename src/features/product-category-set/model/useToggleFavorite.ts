export function useToggleFavorite() {
  const handleToggleFavorite = async (productId: string) => {
    // TODO: 서버 통신 구현
    // await toggleFavoriteAPI(productId);
    console.log('즐겨찾기 토글:', productId);
  };

  return { handleToggleFavorite };
}

