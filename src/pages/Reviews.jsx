import { useEffect, useState } from 'react';

import { useGrowth } from '../context/GrowthContext';
import { getMissionDay } from '../data/plan';

import '../styles/reviews.css';

function Reviews() {
  const {
    currentDay,
    saveDailyReview,
    getDailyReview,
  } = useGrowth();

  const missionDay = getMissionDay(currentDay);

  const [review, setReview] = useState(
    getDailyReview(currentDay)
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setReview(getDailyReview(currentDay));
    setSaved(false);
  }, [currentDay]);

  const updateField = (field, value) => {
    setReview((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    saveDailyReview(currentDay, review);
    setSaved(true);
  };

  return (
    <div className="reviews-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">DAILY REFLECTION</span>
          <h1>Reviews</h1>
          <p>
            Don't just complete the day. Learn from it.
          </p>
        </div>

        <div className="review-day">
          <span>CURRENT DAY</span>
          <strong>Day {currentDay}</strong>
        </div>
      </header>

      <section className="review-context">
        <span className="eyebrow">
          DAY {currentDay} · {missionDay?.theme}
        </span>

        <h2>{missionDay?.title}</h2>

        <p>
          Take a few minutes to understand what actually happened
          today.
        </p>
      </section>

      <section className="review-grid">
        <ReviewField
          label="What went well?"
          placeholder="What did you accomplish today?"
          value={review.wins}
          onChange={(value) => updateField('wins', value)}
        />

        <ReviewField
          label="What did you learn?"
          placeholder="What do you understand now that you didn't before?"
          value={review.lessons}
          onChange={(value) => updateField('lessons', value)}
        />

        <ReviewField
          label="What blocked you?"
          placeholder="What distracted, confused, or slowed you down?"
          value={review.blockers}
          onChange={(value) => updateField('blockers', value)}
        />

        <ReviewField
          label="What will you do tomorrow?"
          placeholder="Choose one clear improvement for tomorrow."
          value={review.tomorrow}
          onChange={(value) => updateField('tomorrow', value)}
        />
      </section>

      <div className="review-actions">
        {saved && (
          <span className="saved-message">
            ✓ Review saved
          </span>
        )}

        <button
          className="save-review"
          onClick={handleSave}
        >
          Save today's review
        </button>
      </div>
    </div>
  );
}

function ReviewField({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <label className="review-field">
      <span>{label}</span>

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default Reviews;