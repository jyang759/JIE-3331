import React, { useState } from 'react';
import './App.css';
import TextEditor from './pages/TextEditor';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

function App() {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <Sidebar content={content}
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
