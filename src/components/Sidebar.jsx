export function Sidebar({ activePage, setActivePage }) {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
    { id: 'mission', label: '30-Day Mission', icon: '◈' },
    { id: 'gainly', label: 'Gainly', icon: '↗' },
    { id: 'vendors', label: 'Vendors', icon: '♙' },
    { id: 'forex', label: 'Forex', icon: '◉' },
    { id: 'trading', label: 'Trading Journal', icon: '⌁' },
    { id: 'skills', label: 'Skills', icon: '◇' },
    { id: 'gadgets', label: 'Gadgets', icon: '▣' },
  ];

  const secondaryNavigation = [
    { id: 'reviews', label: 'Reviews', icon: '✓' },
    { id: 'brain-dump', label: 'Brain Dump', icon: '✦' },
    { id: 'analytics', label: 'Analytics', icon: '▥' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
    { id: 'experiments', label: 'Experiments', icon: '⌁' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">AY</div>

        <div>
          <h2>AY OS</h2>
          <span>Growth System</span>
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-title">MAIN</span>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? 'active' : ''
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-section secondary">
        <span className="sidebar-title">SYSTEM</span>

        <nav>
          {secondaryNavigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? 'active' : ''
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="focus-card">
          <span>Today's focus</span>
          <strong>Build, don't browse.</strong>
          <small>One meaningful task at a time.</small>
        </div>

        <div className="profile">
          <div className="profile-avatar">A</div>

          <div>
            <strong>Ayomide</strong>
            <span>Founder mode</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

