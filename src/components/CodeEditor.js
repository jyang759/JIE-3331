import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { EditorView } from "@codemirror/view";


function CodeEditor({ content, setContent, showLineNumbers, resizeTabSize, settingsFontSize, settingsFontColor }) { //add , spellCheckOn

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setContent(val);
  }, [setContent]);

  const fontSize = EditorView.theme({
    "&": {
      fontSize: "" + settingsFontSize + "px"
    }
  });
  const fontColor = EditorView.theme({
    "&": {
      color: "" + settingsFontColor + "",
    }
  });


  return <CodeMirror value={content} height="90vh" width="88vw" theme={fontColor} onChange={onChange}

    extensions={[
      fontSize,
      fontColor
      // EditorView.contentAttributes.of({ spellcheck: spellCheckOn })
    ]}

    basicSetup={{
      lineNumbers: showLineNumbers,
      tabSize: resizeTabSize,
    }} />;
}
export default CodeEditor;
