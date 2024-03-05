import React, { useEffect, useState } from 'react';
import { MdLightMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

import "./Toolbar.css";

const Toolbar = ({ currentFileName, currentFileHandle, setCurrentFileHandle, setCurrentFileName, setContent }) => {
  const [fileName, setFileName] = useState(currentFileName || "Untitled");

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
        <div className='tab'>
          <div>{fileName}</div>
          <div onClick={closeTab}> X</div>
        </div>
        <div className='plus'>+</div>
      </div>
    </div>
  );
};

export default Toolbar;
