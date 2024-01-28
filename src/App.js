import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.js';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

function App() {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <Sidebar content={content} setContent={setContent}
      />
      <div className="vertical-container">
        <Toolbar
        ></Toolbar>
        <CodeEditor
          setContent={setContent} content={content}
        ></CodeEditor>
      </div>
    </div>
  );
}

export default App;
