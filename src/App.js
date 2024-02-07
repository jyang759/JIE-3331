import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.js';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

function App() {
  const [content, setContent] = useState("");
  const [tabSize, setTabSize] = useState(4);

  return (
    <div className="App">
      <Sidebar content={content} setContent={setContent} tabSize={tabSize} setTabSize={setTabSize}
      />
      <div className="vertical-container">
        <Toolbar
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
