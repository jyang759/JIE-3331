import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import "./Toolbar.css";


const Tab = ({ file, activeTab, setActiveTab, closeTab }) => {
  const isActive = file.id === activeTab;
  return (
    <div className={`tab${isActive ? ' active' : ''}`} onClick={() => setActiveTab(file.id)}>
      <div>{file.name}</div>
      <div className="close-tab" onClick={(event) => closeTab(file.id, event)}>X</div>
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
        <button className='plus' onClick={addToOpenFiles}>+</button>
      </div>
    </div>
  );
};

export default Toolbar;
