import type { SearchResultItem } from '../types';
import { MOCK_SEARCH_RESULTS } from '../mocks';

const INITIAL_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

// 한글 문자에서 초성 추출
function getInitialConsonant(char: string): string {
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) {
    return '';
  }
  const initialIndex = Math.floor((code - 0xAC00) / 588);
  return INITIAL_CONSONANTS[initialIndex] || '';
}

// 문자열이 초성만으로 구성되어 있는지 확인
function isInitialConsonantOnly(str: string): boolean {
  return str.split('').every((char) => INITIAL_CONSONANTS.includes(char));
}

// 한개의 알파벳인지 확인
function isSingleAlphabet(str: string): boolean {
  return str.length === 1 && /[a-zA-Z]/.test(str);
}

// 첫글자 초성 추출
function getFirstInitialConsonant(word: string): string {
  if (!word) return '';
  const firstChar = word[0];
  return getInitialConsonant(firstChar);
}

export function getSearchResults(query: string, searchData: SearchResultItem[] = MOCK_SEARCH_RESULTS): SearchResultItem[] {
  if (!query.trim()) {
    return [];
  }

  const trimmedQuery = query.trim();
  const lowerQuery = trimmedQuery.toLowerCase();
  
  // 우선순위 검색
  return searchData.filter((item) => {
    const itemName = item.name;
    const itemNameLower = itemName.toLowerCase();
    
    // 1. 초성 검색: 검색어가 초성만 있고, 첫 글자의 초성이 일치하는지 확인
    if (isInitialConsonantOnly(trimmedQuery)) {
      const queryInitial = trimmedQuery[0];
      const itemFirstInitial = getFirstInitialConsonant(itemName);
      return itemFirstInitial === queryInitial;
    }
    
    // 2. 알파벳 한 글자 검색: 첫 글자가 일치하는지 확인
    if (isSingleAlphabet(trimmedQuery)) {
      const itemFirstChar = itemNameLower[0];
      return itemFirstChar === lowerQuery;
    }
    
    // 3. 알파벳으로만 구성된 검색어: 전체 또는 단어 단위로 시작하는지 확인
    if (/^[a-zA-Z]+$/.test(trimmedQuery)) {
      // 전체 문자열이 검색어로 시작하는지 확인
      if (itemNameLower.startsWith(lowerQuery)) {
        return true;
      }
      // 단어 단위로 검색어로 시작하는 단어가 있는지 확인
      const words = itemNameLower.split(/\s+/);
      return words.some((word) => word.startsWith(lowerQuery));
    }
    
    // 4. 첫 글자로 시작하는지 확인
    if (itemNameLower.startsWith(lowerQuery)) {
      return true;
    }
    
    // 5. 일반 검색: 검색어가 포함되어 있는지 확인 (한글 검색어만)
    if (itemNameLower.includes(lowerQuery)) {
      return true;
    }
    
    return false;
  });
}
