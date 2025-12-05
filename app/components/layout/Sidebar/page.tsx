'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './page.module.css';

interface MenuItem {
  href: string;
  icon: string;
  alt: string;
  label: string;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    items: [
      {
        href: '/pages/home',
        icon: '/assets/home.svg',
        alt: '홈',
        label: '홈',
      },
    ],
  },
  {
    title: '재고 관리',
    items: [
      {
        href: '/pages/status',
        icon: '/assets/box.svg',
        alt: '재고 현황',
        label: '재고 현황',
      },
      {
        href: '/pages/purchase',
        icon: '/assets/cart.svg',
        alt: '입고 및 구매',
        label: '입고 및 구매',
      },
      {
        href: '/pages/usage',
        icon: '/assets/check.svg',
        alt: '사용',
        label: '사용',
      },
      {
        href: '/pages/history',
        icon: '/assets/list.svg',
        alt: '이력관리',
        label: '이력관리',
      },
    ],
  },
  {
    title: '부가 기능',
    items: [
      {
        href: '/pages/analysis',
        icon: '/assets/chart.svg',
        alt: '분석',
        label: '분석',
      },
      {
        href: '/pages/board',
        icon: '/assets/notice.svg',
        alt: '게시판',
        label: '게시판',
      },
    ],
  },
];

const settingsSection: MenuSection = {
  items: [
    {
      href: '/pages/settings',
      icon: '/assets/settings.svg',
      alt: '설정',
      label: '설정',
    },
  ],
};

function MenuItem({ item, pathname }: { item: MenuItem; pathname: string }) {
  const isActive = pathname === item.href;

  return (
    <Link 
      href={item.href} 
      className={clsx(styles.menuItem, isActive && styles.active)}
    >
      <Image
        src={item.icon}
        alt={item.alt}
        width={20}
        height={20}
      />
      {item.label}
    </Link>
  );
}


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.mainMenu}>
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title || `section-${sectionIndex}`} className={clsx(section.title && styles.section)}>
              {section.title && (
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              )}
              <div className={clsx(section.title && styles.menuList)}>
                {section.items.map((item) => (
                  <MenuItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* 설정 메뉴 - 화면 맨 아래 */}
        <div className={styles.settingsSection}>
          {settingsSection.items.map((item) => (
            <MenuItem
              key={item.href}
              item={item}
              pathname={pathname}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

