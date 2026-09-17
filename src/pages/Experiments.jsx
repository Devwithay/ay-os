import { useState } from 'react';

import { useGrowth } from '../context/GrowthContext';

import '../styles/experiments.css';

function Experiments() {
  const {
    experiments,
    addExperiment,
    updateExperiment,
    deleteExperiment,
  } = useGrowth();

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    hypothesis: '',
    action: '',
    result: '',
    lesson: '',
    status: 'planned',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.hypothesis.trim()) return;

    addExperiment(form);

    setForm({
      hypothesis: '',
      action: '',
      result: '',
      lesson: '',
      status: 'planned',
    });

    setShowForm(false);
  };

  return (
    <div className="experiments-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">GAINLY VALIDATION</span>
          <h1>Experiments</h1>
          <p>
            Test assumptions instead of guessing.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm((value) => !value)}
        >
          {showForm ? 'Cancel' : '+ New experiment'}
        </button>
      </header>

      {showForm && (
        <form
          className="experiment-form"
          onSubmit={handleSubmit}
        >
          <label>
            Hypothesis
            <input
              placeholder="Example: Vendors will use receipts more if..."
              value={form.hypothesis}
              onChange={(event) =>
                setForm({
                  ...form,
                  hypothesis: event.target.value,
                })
              }
            />
          </label>

          <label>
            Action
            <textarea
              placeholder="What exactly will you test?"
              value={form.action}
              onChange={(event) =>
                setForm({
                  ...form,
                  action: event.target.value,
                })
              }
            />
          </label>

          <label>
            Expected result
            <textarea
              placeholder="What result would support your hypothesis?"
              value={form.result}
              onChange={(event) =>
                setForm({
                  ...form,
                  result: event.target.value,
                })
              }
            />
          </label>

          <label>
            Lesson
            <textarea
              placeholder="What did you learn?"
              value={form.lesson}
              onChange={(event) =>
                setForm({
                  ...form,
                  lesson: event.target.value,
                })
              }
            />
          </label>

          <button
            className="primary-button"
            type="submit"
          >
            Save experiment
          </button>
        </form>
      )}

      <section className="experiment-list">
        {experiments.length === 0 ? (
          <div className="empty-vendors">
            <span>⌁</span>
            <strong>No experiments yet.</strong>
            <p>
              Your next experiment should answer a real Gainly question.
            </p>
          </div>
        ) : (
          experiments.map((experiment) => (
            <article
              className="experiment-card"
              key={experiment.id}
            >
              <div className="experiment-top">
                <span>HYPOTHESIS</span>

                <select
                  value={experiment.status}
                  onChange={(event) =>
                    updateExperiment(experiment.id, {
                      status: event.target.value,
                    })
                  }
                >
                  <option value="planned">Planned</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                  <option value="abandoned">Abandoned</option>
                </select>
              </div>

              <h3>{experiment.hypothesis}</h3>

              <div className="experiment-details">
                <Detail
                  label="ACTION"
                  value={experiment.action}
                />

                <Detail
                  label="RESULT"
                  value={experiment.result}
                />

                <Detail
                  label="LESSON"
                  value={experiment.lesson}
                />
              </div>

              <button
                className="experiment-delete"
                onClick={() => deleteExperiment(experiment.id)}
              >
                Delete experiment
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

function Detail({ label, value }) {
  if (!value) return null;

  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

export default Experiments;