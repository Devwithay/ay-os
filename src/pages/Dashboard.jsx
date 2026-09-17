
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">THURSDAY, SEPTEMBER 17</span>

          <h1>Good afternoon, Ayomide 👋🏽</h1>

          <p>
            Build something meaningful today. One step at a time.
          </p>
        </div>

        <div className="day-badge">
          <span>30-DAY MISSION</span>
          <strong>Day 1 / 30</strong>
        </div>
      </header>

      <section className="focus-banner">
        <div className="focus-icon">🎯</div>

        <div className="focus-content">
          <span className="eyebrow">TODAY'S MAIN FOCUS</span>

          <h2>Get Gainly moving again.</h2>

          <p>
            Reconnect with your vendors, collect feedback,
            and take one meaningful step toward growth.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">MISSION PROGRESS</span>
          <strong>0%</strong>
          <span className="stat-description">0 of 30 days</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">GAINLY VENDORS</span>
          <strong>0</strong>
          <span className="stat-description">Track your active vendors</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">FOREX PROGRESS</span>
          <strong>Week 1</strong>
          <span className="stat-description">Fundamentals · Ongoing</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">CURRENT STREAK</span>
          <strong>0 🔥</strong>
          <span className="stat-description">Days completed</span>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR WORKDAY</span>
            <h2>Today's Tasks</h2>
          </div>

          <span className="task-count">0 / 6</span>
        </div>

        <div className="tasks-card">
          <div className="task-placeholder">
            <span className="placeholder-icon">✓</span>

            <div>
              <strong>Your daily tasks will appear here.</strong>
              <p>
                We're connecting the real 30-day mission next.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR TWO MISSIONS</span>
            <h2>Core Focus</h2>
          </div>
        </div>

        <div className="focus-grid">
          <div className="mission-card gainly-card">
            <span className="mission-emoji">🚀</span>
            <span className="mission-tag">MISSION A</span>
            <h3>Gainly</h3>
            <p>Build, validate, and grow your SaaS.</p>
            <span className="mission-status">Active mission</span>
          </div>

          <div className="mission-card forex-card">
            <span className="mission-emoji">📈</span>
            <span className="mission-tag">MISSION B</span>
            <h3>Forex</h3>
            <p>Learn the market properly, one lesson at a time.</p>
            <span className="mission-status">Week 1 · Ongoing</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
