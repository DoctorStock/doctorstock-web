import type { NavigationSection } from '../model/types';

export const navigationItems: NavigationSection[] = [
  {
    items: [
      {
        title: '홈',
        href: '/home',
        icon: 'home',
      },
    ],
  },
  {
    title: '재고 관리',
    items: [
      {
        title: '재고 현황',
        href: '/status',
        icon: 'box',
      },
      {
        title: '입고 및 구매',
        href: '/purchase',
        icon: 'cart',
      },
      {
        title: '사용',
        href: '/usage',
        icon: 'check',
      },
      {
        title: '이력관리',
        href: '/history',
        icon: 'list',
      },
    ],
  },
  {
    title: '부가 기능',
    items: [
      {
        title: '분석',
        href: '/analysis',
        icon: 'chart',
      },
      {
        title: '게시판',
        href: '/board',
        icon: 'notice',
      },
    ],
  },
  {
    items: [
        {
          title: '설정',
          href: '/settings',
          icon: 'setting',
        },
      ],
  }
];

