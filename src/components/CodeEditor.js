import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";

function CodeEditor({ 
  content, 
  setContent, 
  showLineNumbers, 
  resizeTabSize, 
  settingsFontSize, 
  settingsFontColor, 
  spellCheckOn 
}) { 
  const onChange = React.useCallback((val, viewUpdate) => {
    setContent(val);
  }, [setContent]);

  const themeStyles = {
    "&": {
      fontSize: `${settingsFontSize}px`,
      color: settingsFontColor,
    }
  };

  const fontSizeExtension = EditorView.theme(themeStyles);
  const fontColorExtension = EditorView.theme(themeStyles);

  const extensions = [
    fontSizeExtension,
    fontColorExtension,
    EditorView.contentAttributes.of({ spellcheck: spellCheckOn })
  ];

  const basicSetup = {
    lineNumbers: showLineNumbers,
    tabSize: resizeTabSize,
  };

  return (
    <CodeMirror
      value={content}
      height="90vh"
      theme={fontColorExtension}
      onChange={onChange}
      extensions={extensions}
      basicSetup={basicSetup}
    />
  );
}

export default CodeEditor;
