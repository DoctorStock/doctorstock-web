'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
        href: '/page/home',
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
        href: '/page/status',
        icon: '/assets/box.svg',
        alt: '재고 현황',
        label: '재고 현황',
      },
      {
        href: '/page/purchase',
        icon: '/assets/cart.svg',
        alt: '입고 및 구매',
        label: '입고 및 구매',
      },
      {
        href: '/page/usage',
        icon: '/assets/check.svg',
        alt: '사용',
        label: '사용',
      },
      {
        href: '/page/history',
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
        href: '/page/analysis',
        icon: '/assets/chart.svg',
        alt: '분석',
        label: '분석',
      },
      {
        href: '/page/board',
        icon: '/assets/notice.svg',
        alt: '게시판',
        label: '게시판',
      },
    ],
  },
  {
    items: [
      {
        href: '/page/settings',
        icon: '/assets/settings.svg',
        alt: '설정',
        label: '설정',
      },
    ],
  },
];

function MenuItem({ item, pathname }: { item: MenuItem; pathname: string }) {
  const isActive = pathname === item.href;

  return (
    <Link 
      href={item.href} 
      className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
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
  
  // 설정 메뉴를 분리
  const mainMenuItems = menuSections.slice(0, -1);
  const settingsItem = menuSections[menuSections.length - 1];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.mainMenu}>
          {mainMenuItems.map((section, sectionIndex) => (
            <div key={section.title || `section-${sectionIndex}`} className={section.title ? styles.section : ''}>
              {section.title && (
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              )}
              <div className={section.title ? styles.menuList : ''}>
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
          {settingsItem.items.map((item) => (
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

