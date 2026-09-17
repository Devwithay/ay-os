import { useMemo } from 'react';

import { missionPlan } from '../data/plan';
import { useGrowth } from '../context/GrowthContext';
import MissionTest from '../components/MissionTest';
import '../styles/mission.css';

function Mission() {
  const {
    currentDay,
    setCurrentDay,
    toggleTask,
    isTaskCompleted,
    getDayProgress,
    isDayUnlocked,
    isDayCompleted,
    completeCurrentDay,
    completeTestDay,
  } = useGrowth();

  const selectedDay = useMemo(() => {
    return (
      missionPlan.find((day) => day.day === currentDay) ||
      missionPlan[0]
    );
  }, [currentDay]);

  const progress = getDayProgress(selectedDay.tasks);
  const completed = isDayCompleted(selectedDay);

  const isTestDay = selectedDay.type === 'test';

  return (
    <div className="mission-page">
      {/* HEADER */}
      <header className="page-header">
        <div>
          <span className="eyebrow">YOUR 30-DAY SYSTEM</span>

          <h1>30-Day Mission</h1>

          <p>
            Focus on today. Earn access to tomorrow.
          </p>
        </div>

        <div className="mission-progress">
          <strong>{progress}%</strong>
          <span>Day {selectedDay.day} progress</span>
        </div>
      </header>

      {/* DAY SELECTOR */}
      <section className="day-selector">
        {missionPlan.map((day) => {
          const unlocked = isDayUnlocked(day.day);
          const dayCompleted = isDayCompleted(day);

          return (
            <button
              key={day.day}
              disabled={!unlocked}
              className={currentDay === day.day ? 'selected' : ''}
              onClick={() => setCurrentDay(day.day)}
              title={
                !unlocked
                  ? 'Complete the previous day first'
                  : `Open Day ${day.day}`
              }
            >
              <span>
                {!unlocked
                  ? '🔒'
                  : dayCompleted
                    ? '✓'
                    : 'DAY'}
              </span>

              <strong>{day.day}</strong>
            </button>
          );
        })}
      </section>

      {/* DAY HEADING */}
      <section className="mission-heading-card">
        <div>
          <span className="eyebrow">
            DAY {selectedDay.day} · WEEK {selectedDay.week}
          </span>

          <h2>{selectedDay.title}</h2>

          <p>{selectedDay.focus}</p>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {/* TEST DAY */}
      {isTestDay && selectedDay.testId ? (
        <MissionTest
          testId={selectedDay.testId}
          onPassed={completeTestDay}
        />
      ) : (
        <>
          {/* NORMAL DAY TASKS */}
          <section className="mission-tasks">
            {selectedDay.tasks.map((task, index) => {
              const taskId = `day-${selectedDay.day}-task-${index + 1}`;
              const taskCompleted = isTaskCompleted(taskId);

              return (
                <button
                  key={taskId}
                  className={`mission-task ${
                    taskCompleted ? 'completed' : ''
                  }`}
                  onClick={() => toggleTask(taskId)}
                >
                  <span className="task-check">
                    {taskCompleted ? '✓' : ''}
                  </span>

                  <span className="task-details">
                    <strong>
                      {task}
                    </strong>

                    <small>
                      Task {index + 1} of {selectedDay.tasks.length}
                    </small>

                    <span className="task-meta">
                      {selectedDay.type === 'revision'
                        ? 'Revision'
                        : selectedDay.type === 'capstone'
                          ? 'Capstone'
                          : selectedDay.type === 'final'
                            ? 'Final Review'
                            : 'Daily Task'}
                    </span>
                  </span>
                </button>
              );
            })}
          </section>

          {/* COMPLETION CARD */}
          {completed && (
            <section className="completion-card">
              <strong>
                Day {currentDay} completed! 🎉
              </strong>

              <p>
                You finished every task for today.
                You can revisit this day, or unlock the next one.
              </p>

              <button
                className="continue-button"
                onClick={completeCurrentDay}
                disabled={
                  !missionPlan.some(
                    (day) => day.day === currentDay + 1
                  )
                }
              >
                {missionPlan.some(
                  (day) => day.day === currentDay + 1
                )
                  ? 'Unlock next day →'
                  : 'Mission completed'}
              </button>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Mission;