import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App.tsx';

function navigateTo(label: 'בית' | 'אודות') {
  const nav = screen.getByRole('navigation');
  fireEvent.click(within(nav).getByRole('button', { name: label }));
}

describe('Home screen', () => {
  it('shows the title, stage indicator and start button', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'סיימון' })).toBeInTheDocument();
    expect(screen.getByText('שלב 1 מתוך 10')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'התחל משחק' })).toBeInTheDocument();
  });

  it('places the four quadrants per the Mockups layout', () => {
    render(<App />);

    const board = screen.getByRole('group', { name: 'לוח המשחק' });
    const expected = [
      ['ירוק', 'top-left'],
      ['אדום', 'top-right'],
      ['צהוב', 'bottom-left'],
      ['כחול', 'bottom-right'],
    ];
    for (const [label, area] of expected) {
      const quadrant = within(board).getByRole('button', { name: label });
      expect(quadrant.style.gridArea).toBe(area);
    }
    expect(within(board).getAllByRole('button')).toHaveLength(4);
  });

  it('has no extra controls such as settings or sound toggles', () => {
    render(<App />);

    // 4 quadrants + "התחל משחק" + 2 navigation tabs.
    expect(screen.getAllByRole('button')).toHaveLength(7);
  });
});

describe('Navigation', () => {
  it('offers exactly two in-app tabs, implemented as buttons rather than links', () => {
    render(<App />);

    const nav = screen.getByRole('navigation');
    const tabs = within(nav).getAllByRole('button');
    expect(tabs.map((tab) => tab.textContent)).toEqual(['בית', 'אודות']);
    expect(within(nav).queryAllByRole('link')).toHaveLength(0);
    expect(within(nav).getByRole('button', { name: 'בית' })).toHaveAttribute('aria-current', 'page');
  });

  it('switches to About and back without leaving the page', () => {
    const { container } = render(<App />);
    const shell = container.firstElementChild;
    const urlBefore = window.location.href;

    navigateTo('אודות');

    expect(screen.getByRole('heading', { level: 1, name: 'אודות' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'על המשחק' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '10 המשחקים האחרונים' })).toBeInTheDocument();
    expect(screen.getByText('עדיין אין משחקים שמורים.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'מחק היסטוריה' })).not.toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'לוח המשחק' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'אודות' })).toHaveAttribute('aria-current', 'page');

    navigateTo('בית');

    expect(screen.getByRole('group', { name: 'לוח המשחק' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'התחל משחק' })).toBeInTheDocument();
    // Same app shell element and URL: the switch is in-app state, not a page load.
    expect(container.firstElementChild).toBe(shell);
    expect(window.location.href).toBe(urlBefore);
  });
});

describe('Document setup', () => {
  it('declares Hebrew and RTL on the root element', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

    expect(html).toMatch(/<html[^>]*\blang="he"/);
    expect(html).toMatch(/<html[^>]*\bdir="rtl"/);
  });
});
