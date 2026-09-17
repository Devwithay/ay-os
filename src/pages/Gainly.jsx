import { useMemo } from 'react';

import { useGrowth } from '../context/GrowthContext';

import '../styles/gainly.css';

function Gainly() {
  const {
    vendors,
    experiments,
  } = useGrowth();

  const stats = useMemo(() => {
    const active = vendors.filter(
      (vendor) => vendor.status === 'active'
    ).length;

    const prospects = vendors.filter(
      (vendor) =>
        vendor.status === 'prospect' ||
        vendor.status === 'contacted' ||
        vendor.status === 'interested'
    ).length;

    const ambassadors = vendors.filter(
      (vendor) => vendor.ambassador
    ).length;

    const completedExperiments = experiments.filter(
      (experiment) => experiment.status === 'completed'
    ).length;

    return {
      total: vendors.length,
      active,
      prospects,
      ambassadors,
      experiments: experiments.length,
      completedExperiments,
    };
  }, [vendors, experiments]);

  return (
    <div className="gainly-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">CORE MISSION · A</span>
          <h1>Gainly</h1>
          <p>
            Build it. Validate it. Get people using it.
          </p>
        </div>

        <div className="gainly-status">
          <span>STATUS</span>
          <strong>ACTIVE</strong>
        </div>
      </header>

      <section className="gainly-mission">
        <div className="gainly-logo">G</div>

        <div>
          <span className="eyebrow">CURRENT OBJECTIVE</span>

          <h2>Get Gainly moving again.</h2>

          <p>
            Focus on real users, activation, retention and feedback
            before adding unnecessary features.
          </p>
        </div>
      </section>

      <section className="gainly-stats">
        <Stat label="TOTAL VENDORS" value={stats.total} />
        <Stat label="ACTIVE" value={stats.active} />
        <Stat label="PROSPECTS" value={stats.prospects} />
        <Stat label="AMBASSADORS" value={stats.ambassadors} />
        <Stat label="EXPERIMENTS" value={stats.experiments} />
        <Stat
          label="COMPLETED EXPERIMENTS"
          value={stats.completedExperiments}
        />
      </section>

      <section className="gainly-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OPERATING PRINCIPLES</span>
            <h2>What matters right now</h2>
          </div>
        </div>

        <div className="principles-grid">
          <Principle
            number="01"
            title="Talk to users"
            text="Understand why vendors use, ignore, or stop using Gainly."
          />

          <Principle
            number="02"
            title="Improve activation"
            text="Get a new vendor from signup to their first useful action quickly."
          />

          <Principle
            number="03"
            title="Measure retention"
            text="Don't confuse signups with actual active businesses."
          />

          <Principle
            number="04"
            title="Run experiments"
            text="Test assumptions before spending weeks building features."
          />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="gainly-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Principle({ number, title, text }) {
  return (
    <div className="principle">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default Gainly;