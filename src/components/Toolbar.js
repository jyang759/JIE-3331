import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import "./Toolbar.css";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { basicDark, basicLight } from '@uiw/codemirror-theme-basic';


const Tab = ({ file, activeTab, setActiveTab, closeTab }) => {
  const isActive = file.id === activeTab;
  const isContentModified = file.savedContent !== file.content;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`tab${isActive ? ' active' : ''}`} onClick={() => setActiveTab(file.id)}>
      <div>{file.name}{isContentModified && !isHovered ? ' *' : ''}</div>
      <div
        className="close-tab"
        onClick={(event) => closeTab(file.id, event)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        x
      </div>
    </div>
  );
};

const Toolbar = ({ openFiles, addToOpenFiles, setActiveTab, activeTab, closeTab, sidebarVisible, setSidebarVisible, theme, setTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const closeTabHandler = (tabID, event) => {
    event.stopPropagation();
    closeTab(tabID);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }
  const toggleDarkMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(prevMode => !prevMode);
  };



  return (
    <div className="toolbar">
      <div className="icon-top">
        <IoMdMenu className='icon' onClick={toggleSidebar} />
        {/* <MdLightMode className='icon' /> */}
        {isDarkMode ? <MdDarkMode className='icon' onClick={toggleDarkMode} /> : <MdLightMode className='icon' onClick={toggleDarkMode} />}

      </div>
      <div className='tab-bottom'>
        {openFiles.map(file => (
          <Tab key={file.id} file={file} activeTab={activeTab} setActiveTab={setActiveTab} closeTab={closeTabHandler} />
        ))}
        <button className={`plus ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          onClick={addToOpenFiles}>+</button>
      </div>
    </div>
  );
};

export default Toolbar;
