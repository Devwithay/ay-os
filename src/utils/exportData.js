export function exportAYOSData(data) {
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.download = `ay-os-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}

export function importAYOSData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        resolve(data);
      } catch {
        reject(new Error('Invalid AY OS backup file.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Could not read backup file.'));
    };

    reader.readAsText(file);
  });
}