import { useState } from 'react';
import NavBar, { type Screen } from './components/NavBar.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import AboutScreen from './screens/AboutScreen.tsx';

// Both screens live in one React tree; switching is plain state, no router and
// no page load, so future game state held here survives navigation (ADR-2).
export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div className="app">
      <main className="screen">{screen === 'home' ? <HomeScreen /> : <AboutScreen />}</main>
      <NavBar current={screen} onNavigate={setScreen} />
    </div>
  );
}
