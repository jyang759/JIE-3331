import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';

function CodeEditor({ content, setContent, updateContent, setUpdateContent }) {
  
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setContent(val);
  }, [setContent]);

  useEffect(() => {
    if (updateContent) {
      onChange(content);
      setUpdateContent(false);
    }
  }, [content, updateContent, setUpdateContent, onChange]);

  return <CodeMirror value={content} height="90vh" width="88vw" theme={dracula} onChange={onChange} />;
}
export default CodeEditor;