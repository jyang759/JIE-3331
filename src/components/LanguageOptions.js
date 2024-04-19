import React, { useState } from 'react';
import { filteredLangNames } from '../languages';
import './Dropdown.css';

function LanguageOptions ({
    syntaxOn,
    setSyntaxOn,
    langDetection,
    setLangDetection,
    selectedLang,
    setSelectedLang,
    spellChecking,
    setSpellChecking
}) {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="Dropdown">
    <div className={`${isOpen ? 'darkenButton' : ''}`} onClick={toggleDropdown}>Language Options</div>
      {isOpen && (
        <div className="Options">
            <ul>
                <li>Spell Check <input type="checkbox" checked={spellChecking} onChange={() => setSpellChecking(prev => !prev)} /></li>
                <li>Syntax Highlighting <input type="checkbox" checked={syntaxOn} onChange={() => setSyntaxOn(prev => !prev)} /></li>
                <li>Auto Detect Language <input type="checkbox" checked={langDetection} onChange={() => setLangDetection(prev => !prev)} /></li>
                <li className="language-container">
                <label htmlFor="language" className="language-label">Language</label>
                    <select id="language" className="language-select" value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} disabled={langDetection}>
                        {filteredLangNames.map((lang, index) => (
                            <option key={index} value={lang}>{lang}</option>
                        ))}
                    </select>
                </li>
            </ul>
        </div>
      )}
    </div>
  );
};


export default LanguageOptions;