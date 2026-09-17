import { useState } from 'react';

import { useGrowth } from '../context/GrowthContext';

import '../styles/brainDump.css';

function BrainDump() {
  const {
    brainDump,
    addBrainDump,
    deleteBrainDump,
  } = useGrowth();

  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!text.trim()) return;

    addBrainDump(text);
    setText('');
  };

  return (
    <div className="brain-dump-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">CLEAR YOUR HEAD</span>
          <h1>Brain Dump</h1>
          <p>
            Capture the thought. Decide what to do with it later.
          </p>
        </div>
      </header>

      <form
        className="brain-dump-input"
        onSubmit={handleSubmit}
      >
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What's on your mind?"
        />

        <div className="dump-footer">
          <span>
            {text.length} characters
          </span>

          <button type="submit">
            Capture thought
          </button>
        </div>
      </form>

      <section className="dump-list">
        <div className="dump-heading">
          <span className="eyebrow">CAPTURED</span>
          <strong>{brainDump.length} thoughts</strong>
        </div>

        {brainDump.length === 0 ? (
          <div className="empty-dump">
            <span>✦</span>
            <strong>Your brain is clear.</strong>
            <p>
              Thoughts you capture will appear here.
            </p>
          </div>
        ) : (
          brainDump.map((item) => (
            <article
              className="dump-item"
              key={item.id}
            >
              <div>
                <p>{item.text}</p>

                <small>
                  {new Date(item.createdAt).toLocaleString()}
                </small>
              </div>

              <button
                onClick={() => deleteBrainDump(item.id)}
                aria-label="Delete thought"
              >
                ×
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default BrainDump;