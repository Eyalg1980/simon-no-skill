import { TOTAL_ROUNDS } from '../game/constants.ts';

// Milestone 1: instructions and an empty history. Saved results arrive in Milestone 4.
export default function AboutScreen() {
  return (
    <div className="about">
      <header className="screen-header">
        <h1 className="screen-header__title">אודות</h1>
      </header>

      <section className="card" aria-labelledby="about-game-title">
        <h2 id="about-game-title" className="card__title">
          על המשחק
        </h2>
        <p>סיימון הוא משחק זיכרון של צבעים וצלילים.</p>
        <ul className="about__rules">
          <li>לחצו על "התחל משחק" וצפו ברצף הצבעים.</li>
          <li>כשמגיע תורכם, הקישו על הצבעים באותו הסדר.</li>
          <li>בכל שלב מתווסף לרצף צבע אחד, וטעות אחת מסיימת את המשחק.</li>
          <li>השלימו את שלב {TOTAL_ROUNDS} כדי לנצח!</li>
        </ul>
      </section>

      <section className="history" aria-labelledby="history-title">
        <h2 id="history-title" className="history__title">
          10 המשחקים האחרונים
        </h2>
        <p className="history__empty">עדיין אין משחקים שמורים.</p>
      </section>
    </div>
  );
}
