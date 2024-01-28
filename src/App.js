import React, { useState } from 'react';
import './App.css';
import TextEditor from './pages/TextEditor';
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
        <TextEditor
          setContent={setContent} content={content}
        ></TextEditor>
      </div>
    </div>
  );
}

export default App;
