import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { EditorView } from "@codemirror/view";

function CodeEditor({ content, setContent, showLineNumbers, resizeTabSize}) {

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setContent(val);
  }, [setContent]);

  const fontSize = EditorView.baseTheme({
    "&": {
      fontSize: "34px"
    }
  });

  return <CodeMirror value={content} height="90vh" width="88vw" theme={dracula} onChange={onChange} 
  extensions={[fontSize]}
  basicSetup={{ 
    lineNumbers: showLineNumbers, 
    tabSize:resizeTabSize
  }} />;
}
export default CodeEditor;
