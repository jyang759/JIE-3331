import React from 'react';
import './LineNumbers.css'; 

function LineNumbers({ content }) {
  const lineCount = content.split('\n').length;
  const lines = Array.from({ length: lineCount }, (_, index) => index + 1);

  return (
    <div className="line-numbers">
      {lines.map((line) => (
        <div key={line} className="line-number">{line}</div>
      ))}
    </div>
  );
}

export default LineNumbers;
