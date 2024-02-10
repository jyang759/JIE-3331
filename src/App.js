import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.js';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

function App() {
  const [content, setContent] = useState("");
  const [tabSize, setTabSize] = useState(4);
  const [currentFileHandle, setCurrentFileHandle] = useState();
  const [currentFileName, setCurrentFileName] = useState();

  return (
    <div className="App">
      <Sidebar content={content} setContent={setContent} currentFileHandle={currentFileHandle} 
      setCurrentFileHandle={setCurrentFileHandle} setCurrentFileName={setCurrentFileName}
      />
      <div className="vertical-container">
        <Toolbar currentFileName={currentFileName}
        ></Toolbar>
        <CodeEditor
          setContent={setContent} content={content}
          resizeTabSize={tabSize}
        ></CodeEditor>
      </div>
    </div>
  );
}

export default App;
