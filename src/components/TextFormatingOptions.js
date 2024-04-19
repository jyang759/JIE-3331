import React, { useState } from 'react';
import './Dropdown.css';

function TextFormatingOptions ({
    showLineNumbers,
    setShowLineNumbers,
    tabSize,
    setTabSize,
    fontSize,
    setFontSize,
    enableWhitespace,
    setEnableWhitespace
}) {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="Dropdown">
    <div className={`${isOpen ? 'darkenButton' : ''}`} onClick={toggleDropdown}>Text Formatting Options</div>
      {isOpen && (
        <div className="Options">
            <ul>
                <li>Line Numbers <input type="checkbox" checked={showLineNumbers} onChange={() => setShowLineNumbers(prev => !prev)} /></li>
                <li>Tab Size<input className="num" type="number" value={tabSize} onChange={e => setTabSize(parseInt(e.target.value))} /></li>
                <li>Font Size<input className="num" type="number" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} /></li>
                <li>Whitespace<input type="checkbox" checked={enableWhitespace} onChange={() => setEnableWhitespace(prev => !prev)} /></li>
            </ul>
        </div>
      )}
    </div>
  );
};


export default TextFormatingOptions;