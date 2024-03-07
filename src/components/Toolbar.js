import React from 'react';
import { MdLightMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

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

  /*
  function closeTab(tabID, event) {
    event.stopPropagation();
    const remainingFiles = openFiles.filter(tab => tab.id !== tabID);
    setOpenFiles(remainingFiles);
    if (tabID === activeTab) {
      if (remainingFiles.length > 0) {
        const newActiveTab = remainingFiles[remainingFiles.length - 1].id;
        setActiveTab(newActiveTab);
        setContent(remainingFiles[remainingFiles.length - 1].content);
      } else {
        setCurrentFileHandle(undefined);
        setCurrentFileName(undefined);
        setContent("");
        setActiveTab(null);
      }
    }
  }
  */

const Toolbar = ({ openFiles, addToOpenFiles, setActiveTab, activeTab, closeTab }) => {
  const closeTabHandler = (tabID, event) => {
    event.stopPropagation();
    closeTab(tabID);
  };

  return (
    <div className="toolbar">
      <div className="icon-top">
        <IoMdMenu className='icon' />
        <MdLightMode className='icon' />
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
