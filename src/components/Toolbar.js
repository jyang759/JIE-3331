import React, { useEffect, useState } from 'react';
import { MdLightMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

import "./Toolbar.css";

const Toolbar = ({setCurrentFileHandle, setCurrentFileName, setContent, openFiles, addToOpenFiles, setActiveTab, activeTab, setOpenFiles, closeTab}) => {

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

  function closeTabHandler(tabID, event) {
    event.stopPropagation();
    closeTab(tabID);
  }
  

  return (
    <div className="toolbar">
      <div className="icon-top">
        <IoMdMenu className='icon' />
        <MdLightMode className='icon' />
      </div>
      <div className='tab-bottom'>
        {openFiles.map(tab => {
          return <div className={'tab'+(tab.id === activeTab? ' active' : '')}key={tab.id}onClick={() => {setActiveTab(tab.id)}}>
          <div>{tab.name}</div>
          <div className={'close-tab'} onClick={(event) => closeTabHandler(tab.id, event)}>X</div>
        </div>
        })}
        <button className='plus'onClick={addToOpenFiles}>+</button>
      </div>
    </div>
  );
};

export default Toolbar;