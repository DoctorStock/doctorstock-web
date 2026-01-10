import type { NavigationSection } from '../model/types';

export const navigationItems: NavigationSection[] = [
  {
    items: [
      {
        title: '홈',
        href: '/home',
        icon: '/assets/home.svg',
      },
    ],
  },
  {
    title: '재고 관리',
    items: [
      {
        title: '재고 현황',
        href: '/status',
        icon: '/assets/box.svg',
      },
      {
        title: '입고 및 구매',
        href: '/purchase',
        icon: '/assets/cart.svg',
      },
      {
        title: '사용',
        href: '/usage',
        icon: '/assets/check.svg',
      },
      {
        title: '이력관리',
        href: '/history',
        icon: '/assets/list.svg',
      },
    ],
  },
  {
    title: '부가 기능',
    items: [
      {
        title: '분석',
        href: '/analysis',
        icon: '/assets/chart.svg',
      },
      {
        title: '게시판',
        href: '/board',
        icon: '/assets/notice.svg',
      },
    ],
  },
  {
    items: [
        {
          title: '설정',
          href: '/settings',
          icon: '/assets/settings.svg',
        },
      ],
  }
];

