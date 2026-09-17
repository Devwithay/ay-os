import { useState } from 'react';

import {Sidebar} from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Mission from './pages/Mission';
import Reviews from './pages/Reviews';
import BrainDump from './pages/BrainDump';
import { GrowthProvider } from './context/GrowthContext';
import Gainly from './pages/Gainly';
import Vendors from './pages/Vendors';
import Experiments from './pages/Experiments';
import Forex from './pages/Forex';
import TradingJournal from './pages/TradingJournal';
import Skills from './pages/Skills';
import Gadgets from './pages/Gadgets';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

import './App.css';
import './styles/sidebar.css';
import './styles/analytics.css';
import './styles/settings.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <GrowthProvider>
      <div className="app-shell">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className="main-content">
      {activePage === 'dashboard' && <Dashboard />}

{activePage === 'mission' && <Mission />}

{activePage === 'reviews' && <Reviews />}

{activePage === 'brain-dump' && <BrainDump />}

{activePage === 'gainly' && <Gainly />}

{activePage === 'vendors' && <Vendors />}

{activePage === 'experiments' && <Experiments />}
{activePage === 'skills' && <Skills />}
{activePage === 'gadgets' && <Gadgets />}

{activePage === 'forex' && <Forex />}
{activePage === 'trading' && <TradingJournal />}
{activePage === 'analytics' && <Analytics />}
{activePage === 'settings' && <Settings />}
{![
  'dashboard',
  'mission',
  'gainly',
  'vendors',
  'experiments',
  'reviews',
  'brain-dump',
  'forex',
  'trading'
].includes(activePage) && (
  <div className="coming-soon">
    <span>AY OS</span>
    <h1>{activePage}</h1>
    <p>This section is coming next.</p>
  </div>
)}
        </main>
      </div>
    </GrowthProvider>
  );
}

export default App;