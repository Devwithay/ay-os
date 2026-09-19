import { useMemo } from 'react';

import { useGrowth } from '../context/GrowthContext';
import { missionPlan } from '../data/plan';
import '../styles/dashboard.css';

function Dashboard() {
  const {
    currentDay,
    completedTasks,
    isTaskCompleted,
    toggleTask,
    vendors,
    forexProgress,
  } = useGrowth();

  const today = useMemo(() => {
    return (
      missionPlan.find((mission) => mission.day === currentDay) ||
      missionPlan[0]
    );
  }, [currentDay]);

  const taskItems = today.tasks.map((task, index) => {
    const taskId = `day-${today.day}-task-${index + 1}`;

    return {
      id: taskId,
      text: task,
      completed: isTaskCompleted(taskId),
    };
  });

  const completedToday = taskItems.filter(
    (task) => task.completed
  ).length;

  const taskProgress =
    taskItems.length > 0
      ? Math.round((completedToday / taskItems.length) * 100)
      : 0;

  const missionProgress = Math.round(
    (currentDay / 30) * 100
  );

  const activeVendors = vendors.filter(
    (vendor) =>
      vendor.status === 'active' ||
      vendor.status === 'onboarded'
  ).length;

  const forexCompleted = Object.values(forexProgress).filter(
    Boolean
  ).length;

  const getCurrentDate = () => {
    return new Intl.DateTimeFormat('en-NG', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(new Date());
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">
            {getCurrentDate().toUpperCase()}
          </span>

          <h1>Good afternoon, Ayomide 👋🏽</h1>

          <p>
            Build something meaningful today. One step at a time.
          </p>
        </div>

        <div className="day-badge">
          <span>30-DAY MISSION</span>
          <strong>Day {currentDay} / 30</strong>
        </div>
      </header>

      <section className="focus-banner">
        <div className="focus-icon">🎯</div>

        <div className="focus-content">
          <span className="eyebrow">
            TODAY'S MAIN FOCUS
          </span>

          <h2>{today.title}</h2>

          <p>{today.focus}</p>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">
            MISSION PROGRESS
          </span>

          <strong>{missionProgress}%</strong>

          <span className="stat-description">
            Day {currentDay} of 30
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            GAINLY VENDORS
          </span>

          <strong>{activeVendors}</strong>

          <span className="stat-description">
            Active / onboarded vendors
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            FOREX PROGRESS
          </span>

          <strong>
            {forexCompleted > 0
              ? `${forexCompleted} lessons`
              : 'Week 1'}
          </strong>

          <span className="stat-description">
            Fundamentals · Ongoing
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            TODAY'S PROGRESS
          </span>

          <strong>{taskProgress}%</strong>

          <span className="stat-description">
            {completedToday} of {taskItems.length} tasks
          </span>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              YOUR WORKDAY
            </span>

            <h2>Today's Tasks</h2>
          </div>

          <span className="task-count">
            {completedToday} / {taskItems.length}
          </span>
        </div>

        <div className="tasks-card">
          {taskItems.map((task, index) => (
            <button
              key={task.id}
              className={`dashboard-task ${
                task.completed ? 'completed' : ''
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <span className="task-checkbox">
                {task.completed ? '✓' : ''}
              </span>

              <span className="dashboard-task-content">
                <strong>{task.text}</strong>

                <small>
                  Task {index + 1} of {taskItems.length}
                </small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              YOUR TWO MISSIONS
            </span>

            <h2>Core Focus</h2>
          </div>
        </div>

        <div className="focus-grid">
          <div className="mission-card gainly-card">
            <span className="mission-emoji">🚀</span>

            <span className="mission-tag">
              MISSION A
            </span>

            <h3>Gainly</h3>

            <p>
              Build, validate, and grow your SaaS.
            </p>

            <span className="mission-status">
              Active mission
            </span>
          </div>

          <div className="mission-card forex-card">
            <span className="mission-emoji">📈</span>

            <span className="mission-tag">
              MISSION B
            </span>

            <h3>Forex</h3>

            <p>
              Learn the market properly, one lesson at a time.
            </p>

            <span className="mission-status">
              Week 1 · Ongoing
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;