import React, { useRef, useEffect } from 'react';

const OutputPanel = ({ output }) => {
  const outputRef = useRef(null);

  useEffect(() => {
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [output]);

  return (
    <div ref={outputRef} className="output" style={{ fontFamily: 'monospace', backgroundColor: 'black', color: 'white', padding: '16px', border: '1px solid white', overflow: 'auto', height: '200px' }}>
      {output.split('\n').map((line, index) => (
        <div key={index} style={{ margin: 0 }}>{line}</div>
      ))}
    </div>
  );
};

export default OutputPanel;

