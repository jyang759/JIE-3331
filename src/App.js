import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.js';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

function App() {
  //Text content 
  const [content, setContent] = useState("");

  //File states for saving files
  const [currentFileHandle, setCurrentFileHandle] = useState();
  const [currentFileName, setCurrentFileName] = useState();

  //Setting states for settings
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(4);
  const [fontSize, setFontSize] = useState(15);
  const [fontColor, setFontColor] = useState('#000000');

  return (
    <div className="App">
      <Sidebar content={content} setContent={setContent} 
      currentFileHandle={currentFileHandle} setCurrentFileHandle={setCurrentFileHandle} setCurrentFileName={setCurrentFileName} 

      // settings
      showLineNumbers={showLineNumbers} setShowLineNumbers={setShowLineNumbers}
      tabSize={tabSize} setTabSize={setTabSize}
      fontSize={fontSize} setFontSize={setFontSize}
      fontColor={fontColor} setFontColor={setFontColor}
      />
      <div className="vertical-container">
        <Toolbar currentFileName={currentFileName}
        ></Toolbar>
        <CodeEditor
          setContent={setContent} content={content} 

          //settings
          showLineNumbers={showLineNumbers}
          resizeTabSize={tabSize}
          settingsFontSize={fontSize}
          settingsFontColor={fontColor}
        ></CodeEditor>
      </div>
    </div>
  );
}

export default App;
