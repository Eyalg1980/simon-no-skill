import type { ReactNode } from 'react';

export type Screen = 'home' | 'about';

type NavItem = { screen: Screen; label: string; icon: ReactNode };

const HomeIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="currentColor" />
  </svg>
);

const InfoIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <rect x="11" y="10.5" width="2" height="7" rx="1" fill="var(--color-surface)" />
    <circle cx="12" cy="7.5" r="1.3" fill="var(--color-surface)" />
  </svg>
);

const ITEMS: readonly NavItem[] = [
  { screen: 'home', label: 'בית', icon: HomeIcon },
  { screen: 'about', label: 'אודות', icon: InfoIcon },
];

type NavBarProps = {
  current: Screen;
  onNavigate: (screen: Screen) => void;
};

export default function NavBar({ current, onNavigate }: NavBarProps) {
  return (
    <nav className="nav" aria-label="ניווט ראשי">
      {ITEMS.map((item) => {
        const active = item.screen === current;
        return (
          <button
            key={item.screen}
            type="button"
            className={active ? 'nav__item nav__item--active' : 'nav__item'}
            aria-current={active ? 'page' : undefined}
            onClick={() => onNavigate(item.screen)}
          >
            <span className="nav__icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
