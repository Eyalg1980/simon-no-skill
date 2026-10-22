export type SimonColor = 'green' | 'red' | 'yellow' | 'blue';

export type BoardPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type ColorDefinition = {
  id: SimonColor;
  /** Hebrew accessible name of the quadrant. */
  label: string;
  hex: string;
  /** Spatial position on the board; does not flip in RTL (DESIGN §2.5). */
  position: BoardPosition;
};

// Layout per the Mockups (DESIGN §1.1): green top-left, red top-right,
// yellow bottom-left, blue bottom-right.
export const COLORS: readonly ColorDefinition[] = [
  { id: 'green', label: 'ירוק', hex: '#00D26A', position: 'top-left' },
  { id: 'red', label: 'אדום', hex: '#FF3B30', position: 'top-right' },
  { id: 'yellow', label: 'צהוב', hex: '#FFD600', position: 'bottom-left' },
  { id: 'blue', label: 'כחול', hex: '#00A3FF', position: 'bottom-right' },
];
