import React, { useState } from 'react';
import './Dropdown.css';

function SavingOptions ({
    autosaveOn,
    setAutosaveOn,
    autosaveTime,
    setAutosaveTime
}) {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="Dropdown">
    <div className={`${isOpen ? 'darkenButton' : ''}`} onClick={toggleDropdown}>Save Options</div>
      {isOpen && (
        <div className="Options">
            <ul>
                <li>Autosave <input type="checkbox" checked={autosaveOn} onChange={() => setAutosaveOn(prev => !prev)} /></li>
                <li>Autosave Timer <input disabled={!autosaveOn} className="num" type="number" value={autosaveTime} onChange={e => setAutosaveTime(parseInt(e.target.value))} /></li>
            </ul>
        </div>
      )}
    </div>
  );
};


export default SavingOptions;