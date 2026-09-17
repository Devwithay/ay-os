import { useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import '../styles/tradingJournal.css';

function TradingJournal() {
  const {
    tradingJournal,
    addTrade,
    updateTrade,
    deleteTrade,
  } = useGrowth();

  const [form, setForm] = useState({
    pair: '',
    direction: 'long',
    setup: '',
    entry: '',
    stopLoss: '',
    takeProfit: '',
    rr: '',
    result: 'pending',
    lesson: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.pair.trim() || !form.setup.trim()) {
      return;
    }

    addTrade({
      ...form,
      date: new Date().toISOString(),
    });

    setForm({
      pair: '',
      direction: 'long',
      setup: '',
      entry: '',
      stopLoss: '',
      takeProfit: '',
      rr: '',
      result: 'pending',
      lesson: '',
    });
  };

  return (
    <div className="journal-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">FOREX PRACTICE</span>
          <h1>Trading Journal</h1>
          <p>
            Record chart ideas, simulated trades and backtesting results.
          </p>
        </div>

        <div className="practice-badge">
          <span>●</span>
          Backtesting Only
        </div>
      </div>

      <div className="journal-notice">
        <strong>No real-money trades yet.</strong>
        <span>
          Use this journal to build discipline and collect evidence before
          trading live.
        </span>
      </div>

      <section className="journal-form-card">
        <div className="section-heading">
          <div>
            <span className="muted-label">NEW ENTRY</span>
            <h2>Log Practice Trade</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="journal-form">
          <label>
            Pair
            <input
              name="pair"
              value={form.pair}
              onChange={handleChange}
              placeholder="e.g. EUR/USD"
            />
          </label>

          <label>
            Direction
            <select
              name="direction"
              value={form.direction}
              onChange={handleChange}
            >
              <option value="long">Long / Buy</option>
              <option value="short">Short / Sell</option>
            </select>
          </label>

          <label className="full">
            Setup
            <input
              name="setup"
              value={form.setup}
              onChange={handleChange}
              placeholder="What setup did you identify?"
            />
          </label>

          <label>
            Entry
            <input
              name="entry"
              value={form.entry}
              onChange={handleChange}
              placeholder="Entry price"
            />
          </label>

          <label>
            Stop Loss
            <input
              name="stopLoss"
              value={form.stopLoss}
              onChange={handleChange}
              placeholder="SL"
            />
          </label>

          <label>
            Take Profit
            <input
              name="takeProfit"
              value={form.takeProfit}
              onChange={handleChange}
              placeholder="TP"
            />
          </label>

          <label>
            R:R
            <input
              name="rr"
              value={form.rr}
              onChange={handleChange}
              placeholder="e.g. 1:2"
            />
          </label>

          <label>
            Result
            <select
              name="result"
              value={form.result}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="breakeven">Break-even</option>
            </select>
          </label>

          <label className="full">
            Lesson
            <textarea
              name="lesson"
              value={form.lesson}
              onChange={handleChange}
              placeholder="What did you learn from this setup?"
              rows="4"
            />
          </label>

          <button className="primary-button" type="submit">
            Save Practice Entry
          </button>
        </form>
      </section>

      <section className="journal-list-section">
        <div className="section-heading">
          <div>
            <span className="muted-label">HISTORY</span>
            <h2>Practice Entries</h2>
          </div>

          <span className="entry-count">
            {tradingJournal.length} entries
          </span>
        </div>

        {tradingJournal.length === 0 ? (
          <div className="journal-empty">
            <strong>No practice entries yet.</strong>
            <p>
              Start logging your chart ideas and backtests here.
            </p>
          </div>
        ) : (
          <div className="journal-list">
            {tradingJournal.map((trade) => (
              <article className="trade-card" key={trade.id}>
                <div className="trade-top">
                  <div>
                    <strong>{trade.pair}</strong>
                    <span
                      className={`direction ${trade.direction}`}
                    >
                      {trade.direction === 'long'
                        ? 'LONG'
                        : 'SHORT'}
                    </span>
                  </div>

                  <select
                    value={trade.result}
                    onChange={(event) =>
                      updateTrade(trade.id, {
                        result: event.target.value,
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="win">Win</option>
                    <option value="loss">Loss</option>
                    <option value="breakeven">
                      Break-even
                    </option>
                  </select>
                </div>

                <p className="trade-setup">{trade.setup}</p>

                <div className="trade-details">
                  <span>
                    Entry <strong>{trade.entry || '—'}</strong>
                  </span>

                  <span>
                    SL <strong>{trade.stopLoss || '—'}</strong>
                  </span>

                  <span>
                    TP <strong>{trade.takeProfit || '—'}</strong>
                  </span>

                  <span>
                    R:R <strong>{trade.rr || '—'}</strong>
                  </span>
                </div>

                {trade.lesson && (
                  <div className="trade-lesson">
                    <span>LESSON</span>
                    <p>{trade.lesson}</p>
                  </div>
                )}

                <button
                  className="delete-button"
                  onClick={() => deleteTrade(trade.id)}
                >
                  Delete entry
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default TradingJournal;