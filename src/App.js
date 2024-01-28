import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.js';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

function App() {
  const [content, setContent] = useState("");
  const [updateContent, setUpdateContent] = useState(false);

  return (
    <div className="App">
      <Sidebar content={content} setContent={setContent} setUpdateContent={setUpdateContent}
      />
      <div className="vertical-container">
        <Toolbar
        ></Toolbar>
        <CodeEditor
          setContent={setContent} content={content} updateContent={updateContent} setUpdateContent={setUpdateContent}
        >
        </CodeEditor>
      </div>
    </div>
  );
}

export default App;
