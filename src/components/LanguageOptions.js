import React, { useState } from 'react';
import { filteredLangNames } from '../languages';
import './Dropdown.css';

function LanguageOptions ({
    syntaxOn,
    setSyntaxOn,
    langDetection,
    setLangDetection,
    selectedLang,
    setSelectedLang
}) {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="DropDown">
    <div className="LanguageOptionButton" onClick={toggleDropdown}>Language Options</div>
      {isOpen && (
        <div className="LanguageOptions">
            <ul>
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