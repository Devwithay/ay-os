import { useRef, useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import {
  exportAYOSData,
  importAYOSData,
} from '../utils/exportData';
import '../styles/settings.css';

function Settings() {
  const {
    getAYOSData,
    resetAYOS,
  } = useGrowth();

  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleExport = () => {
    exportAYOSData(getAYOSData());

    setMessage('AY OS backup exported successfully.');
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const data = await importAYOSData(file);

      localStorage.setItem(
        'ay-os-import-preview',
        JSON.stringify(data)
      );

      setMessage(
        'Backup file loaded. Full restore will be enabled in the final settings pass.'
      );
    } catch (error) {
      setMessage(error.message);
    }

    event.target.value = '';
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">SYSTEM</span>
          <h1>Settings</h1>
          <p>
            Manage your AY OS data and system preferences.
          </p>
        </div>
      </div>

      {message && (
        <div className="settings-message">
          {message}
        </div>
      )}

      <section className="settings-card">
        <div>
          <span className="muted-label">DATA</span>
          <h2>Backup & Restore</h2>
          <p>
            Export your progress before making major changes or moving
            AY OS to another device.
          </p>
        </div>

        <div className="settings-actions">
          <button
            className="primary-button"
            onClick={handleExport}
          >
            Export AY OS
          </button>

          <button
            className="secondary-button"
            onClick={() => fileInputRef.current?.click()}
          >
            Import Backup
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            hidden
            onChange={handleImport}
          />
        </div>
      </section>

      <section className="settings-card danger">
        <div>
          <span className="muted-label">DANGER ZONE</span>
          <h2>Reset AY OS</h2>
          <p>
            Delete all locally stored AY OS data and start again.
          </p>
        </div>

        <button
          className="danger-button"
          onClick={resetAYOS}
        >
          Reset Everything
        </button>
      </section>

      <section className="settings-card">
        <div>
          <span className="muted-label">SYSTEM INFO</span>
          <h2>AY OS</h2>
          <p>
            Personal growth operating system for the 30-day build.
          </p>
        </div>

        <span className="version">v0.1</span>
      </section>
    </div>
  );
}

export default Settings;