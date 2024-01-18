import React from 'react';
import { MdLightMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

import "./Toolbar.css"
const Toolbar = () => {

  return (
    <div className="toolbar">
      <div className="icon-top">
        <IoMdMenu className='icon' />
        <MdLightMode className='icon' />
      </div>
      <div className='tab-bottom'>
        <div className='tab'>
          <div>Untitled</div>
          <div>X</div>
        </div>
        <div className='plus'>+</div>
      </div>
    </div>
  );
};

export default Toolbar;