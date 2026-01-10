export interface NavigationItem {
  title: string;
  href: string;
  icon?: string; // SVG 경로 또는 LucideIcon
  badge?: string;
  subitems?: Array<{
    title: string;
    href: string;
  }>;
}

export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

