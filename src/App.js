import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.js';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

function App() {
  const [content, setContent] = useState("");
  const [currentFileHandle, setCurrentFileHandle] = useState();
  const [currentFileName, setCurrentFileName] = useState();
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(4);

  return (
    <div className="App">
      <Sidebar content={content} setContent={setContent} 
      currentFileHandle={currentFileHandle} setCurrentFileHandle={setCurrentFileHandle} setCurrentFileName={setCurrentFileName} 
      showLineNumbers={showLineNumbers} setShowLineNumbers={setShowLineNumbers}
      tabSize={tabSize} setTabSize={setTabSize}
      />
      <div className="vertical-container">
        <Toolbar currentFileName={currentFileName}
        ></Toolbar>
        <CodeEditor
          setContent={setContent} content={content} 
          showLineNumbers={showLineNumbers}
          resizeTabSize={tabSize}
        ></CodeEditor>
      </div>
    </div>
  );
}

export default App;
