# Milestone 1 – בסיס אפליקציה ושני מסכים מעוצבים

> סטטוס: **בתכנון / בבנייה**. מקורות: `spec/MILESTONES.md` §Milestone 1, `spec/DESIGN.md`, `spec/ARCHITECTURE.md`, ההחלטות ב-`CLAUDE.md`.

## מטרה

פרויקט Frontend עובד (React + TypeScript + Vite, CSS רגיל) עם שני מסכים מעוצבים – **בית** ו-**אודות** – וניווט ביניהם ללא טעינת דף. הלוח והכפתור **"התחל משחק"** עדיין אינם מריצים משחק.

## Stack (גרסאות שנבחרו)

| חבילה | גרסה | הערה |
|---|---|---|
| `react`, `react-dom` | 19.x | |
| `vite` + `@vitejs/plugin-react` | 8.x / 6.x | `vite-plugin-pwa@2` (מיילסטון 5) תומך ב-Vite 8 |
| `typescript` | 7.x | typecheck בלבד (`tsc --noEmit`), Vite מבצע את ההמרה |
| `vitest` + `jsdom` + `@testing-library/react` + `@testing-library/jest-dom` | 5.x | |
| `@fontsource/heebo` | 5.x | משקלים 400 / 600 / 700 בלבד, ללא Google Fonts |

Node 24 LTS (מקומית ובפייפליין).

## מבנה קבצים

```text
index.html                    lang="he" dir="rtl", <title>סיימון</title>
vite.config.ts                base: '/simon-no-skill/' + הגדרות Vitest
tsconfig.json
src/
  main.tsx                    טעינת הגופן, ה-CSS ו-App
  App.tsx                     App Shell: מצב מסך פנימי ('home' | 'about') + פס ניווט
  index.css                   Tokens (צבעים, טיפוגרפיה, ריווח) + Layout כללי
  game/colors.ts              ארבעת הצבעים: מזהה, שם עברי, HEX, מיקום בלוח (ADR-1)
  game/constants.ts           TOTAL_ROUNDS = 10
  components/SimonBoard.tsx   לוח עגול: CSS Grid 2×2, ארבעה <button> עם aria-label, דיסק מרכזי דקורטיבי
  components/NavBar.tsx       "בית" / "אודות", aria-current למסך הפעיל
  screens/HomeScreen.tsx      כותרת "סיימון", "שלב 1 מתוך 10", לוח, אזור סטטוס, "התחל משחק"
  screens/AboutScreen.tsx     כותרת "אודות", כרטיס "על המשחק", "10 המשחקים האחרונים" + חיווי ריק
  test/setup.ts
  App.test.tsx                בדיקות Render / Navigation
.github/workflows/deploy.yml  Pipeline מלא: npm ci → typecheck → test → build → deploy dist/
```

תיקיית `placeholder/` נמחקת.

## החלטות עיצוב ומימוש

- **ניווט:** `useState` ב-`App` בוחר מסך; אין Router ואין שינוי URL, ולכן אין רענון. כפתורי הניווט הם `<button type="button">`. ה-State המרכזי יישב ב-`App` גם בהמשך (ADR-2), כך שמעבר מסך לא יפרק אותו.
- **לוח (ADR-1):** מיכל עגול `direction: ltr`, Grid 2×2 עם `gap` כהה כפסי הפרדה, כל רבע `<button>` עם פינה חיצונית מעוגלת ו-`grid-area` מתוך `colors.ts`: ירוק למעלה-שמאל, אדום למעלה-ימין, צהוב למטה-שמאל, כחול למטה-ימין. דיסק מרכזי כהה ללא תוכן וללא קלט. במיילסטון זה הרבעים `disabled` אך מוצגים בצבע מלא (מצב "לפני תחילת משחק" לפי ה-Mockups).
- **גודל הלוח:** `min(84vw, 340px, 44dvh)` – נכנס במסך טלפון אנכי (כולל 360×640) בלי גלילה אופקית.
- **Theme:** Background `#0A1628`, Surface `#12213A`, Border `#1E3556`, צבעי ה-Style Guide; כפתור ראשי כחול מלא עם צל רך; כרטיסים כהים עם גבול עדין.
- **טיפוגרפיה:** Heebo עם Fallback `Arial, sans-serif`; H1 32 Bold, H2 24 Bold, H3 20 Semibold, Body 16, Caption 14, Button 16 Semibold.
- **פס ניווט:** תחתון, Surface, שתי לשוניות (בית מימין ב-RTL), אייקון קו פשוט משני לתווית, מצב פעיל בולט (רקע כחול עדין וטקסט לבן).
- **אודות:** כותרת "אודות" (לפי CLAUDE.md), הוראות קצרות, כותרת "10 המשחקים האחרונים" וחיווי "עדיין אין משחקים שמורים". **אין** כפתור "מחק היסטוריה" (מוצג רק כשיש רשומות – מיילסטון 4).
- **ללא:** כפתורי הגדרות, מתג סאונד, Progress Bar, Router, Backend, PWA (מיילסטון 5).

## בדיקות אוטומטיות

1. מסך הבית מציג "סיימון", "שלב 1 מתוך 10", כפתור "התחל משחק" וארבעה רבעים עם שמות נגישים בעברית, כל אחד ב-`grid-area` הנכון.
2. בבית יש בדיוק 7 כפתורים (4 רבעים, "התחל משחק", 2 ניווט) – אין הגדרות/סאונד.
3. מעבר ל"אודות" מציג כותרת, הסבר וחיווי היסטוריה ריקה, ללא "מחק היסטוריה"; חזרה ל"בית" מחזירה את הלוח. הניווט עשוי כפתורים (לא קישורים) ובדיוק שתי אפשרויות.
4. `index.html` מוגדר `lang="he"` ו-`dir="rtl"`.

## פריסה

- `base: '/simon-no-skill/'` → `http://localhost:5173/simon-no-skill/` מקומית.
- ה-Workflow מוחלף ב-Pipeline המלא (ARCHITECTURE §2.9); Build שנכשל לא נפרס.
- בסיום: `builds/milestone-1.zip` מתוך `dist/`.

## מה נבנה בפועל

- כל הקבצים במבנה שלמעלה; גרסאות מותקנות: React 19.3, Vite 8.3, TypeScript 7.0, Vitest 5.0, `@fontsource/heebo` 5.3.
- הגופן נטען דרך `400.css` / `600.css` / `700.css` (עם `unicode-range`, כך שהדפדפן מוריד רק את תת-הקבוצות הנחוצות – עברית ולטינית).
- גודל הלוח סופי: `min(84vw, 340px, 42dvh)` (הוקטן מ-44dvh אחרי שנמצאה גלישה אנכית של 8px ב-360×640).
- `.claude/launch.json` – הגדרת שרת ה-dev לתצוגה המקדימה.
- `builds/milestone-1.zip` – תוכן `dist/` (נבנה עם `base: /simon-no-skill/`, ולכן מיועד לתת-נתיב זה).

## Definition of Done – תוצאות

| # | סעיף | תוצאה | איך נבדק |
|---|---|---|---|
| 1 | `npm run build` ו-typecheck מצליחים; בדיקת Render/Navigation עוברת | ✅ עובר | `npm run typecheck`, `npm run build`, `npm test` – 6/6 בדיקות |
| 2 | שני מסכים, מעבר בלי רענון, אין מסך שלישי | ✅ עובר | בדיקה אוטומטית (אותו App Shell ואותו URL); בדפדפן: משתנה גלובלי שהוצב לפני המעבר נשאר אחרי בית→אודות→בית, ה-URL לא השתנה |
| 3 | ארבעת הרבעים במיקום הנכון, חיווי שלב, "התחל משחק"; אודות עם הסבר והיסטוריה ריקה | ✅ עובר | בדיקה אוטומטית (`grid-area` לכל רבע) + צילום מסך במובייל |
| 4 | עברית, RTL, נוח ב-Smartphone אנכי, ללא גלילה אופקית | ✅ עובר | `lang="he" dir="rtl"` (בדיקה אוטומטית); אמולציה 375×812 ו-360×640: `scrollWidth ≤ clientWidth`, ללא גלישה אנכית במסך הבית; אין שגיאות Console |
| 5 | אין יכולות מחוץ ל-PRD, אין Backend/Database | ✅ עובר | 7 כפתורים בלבד בבית (4 רבעים, התחל משחק, 2 ניווט); אין קריאות רשת מלבד נכסי האפליקציה |

**מגבלות:** הבדיקה החזותית נעשתה באמולציית מובייל בדפדפן, לא במכשיר פיזי. הכפתור "התחל משחק" והלוח אינם פעילים (מתוכנן למיילסטון 2).

## פריסה

- [ ] קומיט ודחיפה ל-`main`
- [ ] ה-Workflow (typecheck → test → build → deploy) עבר
- [ ] הלינק החי מציג את האפליקציה: https://eyalg1980.github.io/simon-no-skill/
