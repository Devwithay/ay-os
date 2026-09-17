import { forexCurriculum } from '../data/forexCurriculum';
import { skills } from '../data/skills';
import { useGrowth } from '../context/GrowthContext';
import { getCompletionPercentage } from '../utils/calculations';
import '../styles/analytics.css';

function Analytics() {
  const {
    currentDay,
    completedTasks,
    vendors,
    experiments,
    forexProgress,
    tradingJournal,
    skillProgress,
  } = useGrowth();

  const totalMissionTasks = Object.values(completedTasks).length;
  const completedMissionTasks = Object.values(completedTasks).filter(
    Boolean
  ).length;

  const missionProgress = getCompletionPercentage(
    completedMissionTasks,
    Math.max(totalMissionTasks, 1)
  );

  const activeVendors = vendors.filter(
    (vendor) => vendor.status === 'active'
  ).length;

  const completedExperiments = experiments.filter(
    (experiment) => experiment.status === 'completed'
  ).length;

  const totalForexLessons = forexCurriculum.reduce(
    (total, week) => total + week.lessons.length,
    0
  );

  const completedForexLessons = forexCurriculum.reduce(
    (total, week) =>
      total +
      week.lessons.filter(
        (lesson) =>
          forexProgress[lesson.id] === true ||
          lesson.status === 'done'
      ).length,
    0
  );

  const forexPercentage = getCompletionPercentage(
    completedForexLessons,
    totalForexLessons
  );

  const skillStats = skills.map((skill) => {
    const completed = skill.roadmap.filter(
      (item) =>
        skillProgress[item.id] === true ||
        item.status === 'done'
    ).length;

    return {
      ...skill,
      completed,
      percentage: getCompletionPercentage(
        completed,
        skill.roadmap.length
      ),
    };
  });

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">SYSTEM OVERVIEW</span>
          <h1>Analytics</h1>
          <p>
            See where your effort is going and what is actually moving.
          </p>
        </div>
      </div>

      <section className="analytics-grid">
        <div className="analytics-card">
          <span>MISSION DAY</span>
          <strong>{currentDay}/30</strong>
          <small>Current position</small>
        </div>

        <div className="analytics-card">
          <span>MISSION TASKS</span>
          <strong>{missionProgress}%</strong>
          <small>Tracked completion</small>
        </div>

        <div className="analytics-card">
          <span>ACTIVE GAINLY VENDORS</span>
          <strong>{activeVendors}</strong>
          <small>Currently active</small>
        </div>

        <div className="analytics-card">
          <span>EXPERIMENTS</span>
          <strong>{completedExperiments}</strong>
          <small>Completed experiments</small>
        </div>
      </section>

      <section className="analytics-section">
        <div className="section-heading">
          <div>
            <span className="muted-label">CORE MISSION B</span>
            <h2>Forex Progress</h2>
          </div>

          <strong>{forexPercentage}%</strong>
        </div>

        <div className="analytics-progress">
          <div
            style={{ width: `${forexPercentage}%` }}
          />
        </div>

        <p className="analytics-note">
          {completedForexLessons} of {totalForexLessons} curriculum
          lessons completed.
        </p>
      </section>

      <section className="analytics-section">
        <div className="section-heading">
          <div>
            <span className="muted-label">SUPPORTING SKILLS</span>
            <h2>Skill Progress</h2>
          </div>
        </div>

        <div className="skill-analytics">
          {skillStats.map((skill) => (
            <div className="skill-analytics-row" key={skill.id}>
              <div>
                <strong>{skill.name}</strong>
                <span>
                  {skill.completed}/{skill.roadmap.length} completed
                </span>
              </div>

              <div className="analytics-progress">
                <div
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>

              <strong>{skill.percentage}%</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="analytics-section">
        <div className="section-heading">
          <div>
            <span className="muted-label">PRACTICE</span>
            <h2>Trading Journal</h2>
          </div>
        </div>

        <div className="journal-analytics">
          <div>
            <strong>{tradingJournal.length}</strong>
            <span>Total entries</span>
          </div>

          <div>
            <strong>
              {
                tradingJournal.filter(
                  (trade) => trade.result === 'win'
                ).length
              }
            </strong>
            <span>Practice wins</span>
          </div>

          <div>
            <strong>
              {
                tradingJournal.filter(
                  (trade) => trade.result === 'loss'
                ).length
              }
            </strong>
            <span>Practice losses</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;