import { useMemo } from 'react';
import { forexCurriculum, forexRules } from '../data/forexCurriculum';
import { useGrowth } from '../context/GrowthContext';
import '../styles/forex.css';

function Forex() {
  const { forexProgress, toggleForexLesson } = useGrowth();

  const progress = forexProgress || {};

  const totalLessons = useMemo(
    () =>
      forexCurriculum.reduce(
        (total, week) => total + week.lessons.length,
        0
      ),
    []
  );

  const completedLessons = useMemo(
    () =>
      forexCurriculum.reduce(
        (total, week) =>
          total +
          week.lessons.filter(
            (lesson) =>
              progress[lesson.id] === true || lesson.status === 'done'
          ).length,
        0
      ),
    [progress]
  );

  const overallPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  const currentWeek = forexCurriculum.find(
    (week) => week.week === forexRules.currentWeek
  );

  const currentWeekCompleted = currentWeek.lessons.filter(
    (lesson) =>
      progress[lesson.id] === true || lesson.status === 'done'
  ).length;

  const currentWeekPercentage = Math.round(
    (currentWeekCompleted / currentWeek.lessons.length) * 100
  );

  return (
    <div className="forex-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">CORE MISSION B</span>
          <h1>Forex</h1>
          <p>
            Build actual trading knowledge before risking actual money.
          </p>
        </div>

        <div className="practice-badge">
          <span>●</span>
          Practice Mode
        </div>
      </div>

      <div className="forex-warning">
        <strong>Learning phase.</strong>
        <span>
          Real-money trading is currently disabled. Focus on understanding,
          chart practice and backtesting.
        </span>
      </div>

      <section className="forex-overview">
        <div className="forex-progress-card">
          <div className="card-heading">
            <div>
              <span className="muted-label">OVERALL PROGRESS</span>
              <h2>{overallPercentage}%</h2>
            </div>

            <div className="progress-ring">
              {completedLessons}/{totalLessons}
            </div>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>

          <p>
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <div className="forex-progress-card current">
          <span className="muted-label">CURRENT WEEK</span>

          <h2>
            Week {currentWeek.week}: {currentWeek.title}
          </h2>

          <div className="week-meta">
            <span>{currentWeekCompleted} completed</span>
            <span>{currentWeekPercentage}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${currentWeekPercentage}%` }}
            />
          </div>
        </div>
      </section>

      <section className="curriculum-section">
        <div className="section-heading">
          <div>
            <span className="muted-label">ROADMAP</span>
            <h2>Forex Curriculum</h2>
          </div>
        </div>

        <div className="forex-weeks">
          {forexCurriculum.map((week) => {
            const weekCompleted = week.lessons.filter(
              (lesson) =>
                progress[lesson.id] === true || lesson.status === 'done'
            ).length;

            const percentage = Math.round(
              (weekCompleted / week.lessons.length) * 100
            );

            const isLocked =
              week.week > forexRules.currentWeek;

            return (
              <article
                className={`forex-week ${
                  isLocked ? 'locked' : ''
                }`}
                key={week.week}
              >
                <div className="week-header">
                  <div>
                    <span className="week-number">
                      WEEK {week.week}
                    </span>

                    <h3>{week.title}</h3>
                    <p>{week.description}</p>
                  </div>

                  <div className="week-percentage">
                    {percentage}%
                  </div>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="lesson-list">
                  {week.lessons.map((lesson) => {
                    const completed =
                      progress[lesson.id] === true ||
                      lesson.status === 'done';

                    return (
                      <button
                        key={lesson.id}
                        className={`lesson-row ${
                          completed ? 'completed' : ''
                        }`}
                        disabled={isLocked}
                        onClick={() =>
                          toggleForexLesson(lesson.id)
                        }
                      >
                        <span className="lesson-check">
                          {completed ? '✓' : ''}
                        </span>

                        <span>{lesson.title}</span>

                        {isLocked && (
                          <span className="lesson-lock">🔒</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Forex;