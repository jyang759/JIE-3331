import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';

function CodeEditor({ content, setContent, showLineNumbers }) {

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setContent(val);
  }, [setContent]);

  return <CodeMirror value={content} height="90vh" width="88vw" theme={dracula} onChange={onChange} basicSetup={{ lineNumbers: showLineNumbers }} />;
}
export default CodeEditor;
