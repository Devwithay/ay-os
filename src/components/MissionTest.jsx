import { useState } from 'react';
import { missionTests } from '../data/missionTests';

function MissionTest({ testId, onPassed }) {
  const questions = missionTests[testId] || [];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions.length) {
    return null;
  }

  const score = questions.reduce(
    (total, question) =>
      total + (answers[question.id] === question.answer ? 1 : 0),
    0
  );

  const passed = score >= Math.ceil(questions.length * 0.7);

  const handleAnswer = (questionId, answer) => {
    if (submitted) return;

    setAnswers((current) => ({
      ...current,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="mission-test">
      <div className="test-header">
        <div>
          <span className="muted-label">ASSESSMENT</span>
          <h3>Weekly Test</h3>
        </div>

        {submitted && (
          <strong>
            {score}/{questions.length}
          </strong>
        )}
      </div>

      <div className="test-questions">
        {questions.map((question, index) => (
          <div className="test-question" key={question.id}>
            <p>
              <strong>{index + 1}.</strong>{' '}
              {question.question}
            </p>

            <div className="test-options">
              {question.options.map((option, optionIndex) => {
                const selected =
                  answers[question.id] === optionIndex;

                const correct =
                  submitted &&
                  optionIndex === question.answer;

                return (
                  <button
                    key={option}
                    className={[
                      selected ? 'selected' : '',
                      correct ? 'correct' : '',
                    ].join(' ')}
                    onClick={() =>
                      handleAnswer(question.id, optionIndex)
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          className="primary-button"
          disabled={Object.keys(answers).length !== questions.length}
          onClick={handleSubmit}
        >
          Submit Test
        </button>
      ) : (
        <div className={`test-result ${passed ? 'passed' : 'failed'}`}>
          <strong>
            {passed ? 'Test passed.' : 'Review and try again.'}
          </strong>

          <span>
            You scored {score} out of {questions.length}.
          </span>

          {passed && (
            <button
              className="primary-button"
              onClick={onPassed}
            >
              Complete Test Day
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MissionTest;