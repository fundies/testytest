import React from 'react';

const OutputPanel = ({ output, error }) => {
  return (
    <div className="output-panel">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <pre className="output">{output}</pre>
      )}
    </div>
  );
};

export default OutputPanel;

