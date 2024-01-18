import React, { useState, useRef } from 'react';
import LineNumbers from './LineNumbers'; 
import './TextEditor.css';
import './LineNumbers.css';

function TextEditor({ setContent, content }) {
  const [fileName, setFileName] = useState('textEditorContent.txt');
  const textAreaRef = useRef(null);
  const linesRef = useRef(null);

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleScroll = () => {
    if (linesRef.current) {
      linesRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  return (
    <div className="editor-container">
      <LineNumbers content={content} ref={linesRef} />
      <textarea
        ref={textAreaRef}
        className="text-area"
        value={content}
        onChange={handleInputChange}
        onScroll={handleScroll}
      />
    </div>
  );
}

export default TextEditor;
