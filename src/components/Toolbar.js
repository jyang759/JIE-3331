import React, { useEffect, useState } from 'react';
import { MdLightMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

import "./Toolbar.css";

const Toolbar = ({setCurrentFileHandle, setCurrentFileName, setContent, openFiles, addToOpenFiles, setActiveTab, activeTab}) => {


  function closeTab() {
    setCurrentFileHandle();
    setCurrentFileName();
    setContent("");
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
          <div onClick={closeTab}>X</div>
        </div>
        })}
        <button className='plus'onClick={addToOpenFiles}>+</button>
      </div>
    </div>
  );
};

export default Toolbar;