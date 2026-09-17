import { skills } from '../data/skills';
import { useGrowth } from '../context/GrowthContext';
import '../styles/skills.css';

function Skills() {
  const { skillProgress, toggleSkill } = useGrowth();

  return (
    <div className="skills-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">SUPPORTING SKILLS</span>
          <h1>Skills</h1>
          <p>
            Build skills that support the missions and your future.
          </p>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => {
          const completed = skill.roadmap.filter(
            (item) =>
              skillProgress[item.id] === true ||
              item.status === 'done'
          ).length;

          const percentage = Math.round(
            (completed / skill.roadmap.length) * 100
          );

          return (
            <section className="skill-card" key={skill.id}>
              <div className="skill-card-header">
                <div>
                  <div className="skill-title-row">
                    <h2>{skill.name}</h2>

                    <span
                      className={`priority ${skill.priority}`}
                    >
                      {skill.priority === 'high'
                        ? 'HIGH PRIORITY'
                        : 'SUPPORTING'}
                    </span>
                  </div>

                  <p>{skill.description}</p>
                </div>

                <strong>{percentage}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="skill-meta">
                {completed}/{skill.roadmap.length} completed
              </div>

              <div className="skill-roadmap">
                {skill.roadmap.map((item) => {
                  const isCompleted =
                    skillProgress[item.id] === true ||
                    item.status === 'done';

                  return (
                    <button
                      key={item.id}
                      className={`skill-item ${
                        isCompleted ? 'completed' : ''
                      }`}
                      onClick={() => toggleSkill(item.id)}
                    >
                      <span className="skill-check">
                        {isCompleted ? '✓' : ''}
                      </span>

                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;