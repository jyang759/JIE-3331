import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

function App() {
  const [code, setCode] = useState("This is a demo and its getting really late so cant do more.\nNOTE: DON'T PUSH THIS TO MAIN")
  
  return (
    <div className ="App">
      <header className = "AppHeader" >
        <CodeMirror
          value = {code}
          theme={dracula}
          onChange={(textEditor, change) => {
            setCode(textEditor.getValue());
          }}
        />
      </header>
    </div>
  )
}
export default App;

