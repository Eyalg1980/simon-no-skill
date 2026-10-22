import type { CSSProperties } from 'react';
import { COLORS } from '../game/colors.ts';

type SimonBoardProps = {
  /** When true the quadrants do not accept input. */
  disabled: boolean;
};

// ADR-1: round container with a 2×2 grid of semantic buttons. The board is
// always laid out LTR so the colour positions never mirror under RTL.
export default function SimonBoard({ disabled }: SimonBoardProps) {
  return (
    <div className="board" role="group" aria-label="לוח המשחק">
      {COLORS.map((color) => (
        <button
          key={color.id}
          type="button"
          className={`quadrant quadrant--${color.position}`}
          style={{ gridArea: color.position, '--quadrant-color': color.hex } as CSSProperties}
          aria-label={color.label}
          data-color={color.id}
          disabled={disabled}
        />
      ))}
      <div className="board__center" aria-hidden="true" />
    </div>
  );
}
