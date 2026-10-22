import SimonBoard from '../components/SimonBoard.tsx';
import { TOTAL_ROUNDS } from '../game/constants.ts';

// Milestone 1: static "before game start" state. The game engine is wired in Milestone 2.
export default function HomeScreen() {
  return (
    <div className="home">
      <header className="screen-header">
        <h1 className="screen-header__title">סיימון</h1>
      </header>

      <p className="home__stage">
        שלב 1 מתוך {TOTAL_ROUNDS}
      </p>
      <p className="home__status" aria-live="polite" />

      <SimonBoard disabled />

      <div className="home__actions">
        <button type="button" className="btn btn--primary">
          התחל משחק
        </button>
      </div>
    </div>
  );
}
