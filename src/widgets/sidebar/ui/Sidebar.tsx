import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { navigationItems } from '@/entities/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.mainMenu}>
          {navigationItems.map((section, sectionIndex) => {
            // 마지막 섹션(설정)인지 확인
            const isLastSection = sectionIndex === navigationItems.length - 1;
            return (
              <div
                key={section.title || `section-${sectionIndex}`}
                className={clsx(
                  section.title && styles.section,
                  isLastSection && styles.settingsSection
                )}
              >
                {section.title && (
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                )}
                <div className={clsx(section.title && styles.menuList)}>
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={clsx(
                          styles.menuItem,
                          isActive && styles.active
                        )}
                      >
                        {item.icon && (
                          <img
                            src={`/assets/${item.icon}${isActive ? '_white' : '_black'}.svg`}
                            alt=""
                            width={20}
                            height={20}
                          />
                        )}
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
