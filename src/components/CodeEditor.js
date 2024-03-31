import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import React, { useEffect} from 'react';

function CodeEditor({
  content,
  setContent,
  showLineNumbers,
  resizeTabSize,
  settingsFontSize,
  settingsFontColor,
  spellCheckOn,
  theme,
  currentFileHandle
}) {

  const onChange = React.useCallback(async (val, viewUpdate) => {
    setContent(val);
  }, [setContent]);

  useEffect(() => {
    const interval = setInterval(async () => {
      // Save the content every 10 seconds
      if (currentFileHandle) {
        let stream = await currentFileHandle.createWritable();
        await stream.write(content);
        await stream.close();
        console.log('Content saved');
      }
    },  10000); // Every 10 seconds

    return () => clearInterval(interval); // Clear the interval 
  }, [content, currentFileHandle]);

  const themeStyles = {
    "&": {
      fontSize: `${settingsFontSize}px`,
      color: settingsFontColor,
      background: theme === 'dark' ? '#4f4f4e' : '#ffffff',
    },
    ".cm-gutters": {
      backgroundColor: theme === 'dark' ? '#6e6d6d' : '#e0dede',
      color: theme === 'dark' ? '#c9c8c7' : 'black',

      // border: theme === 'dark' ? '5px black' : 'white',
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
