import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { basicDark, basicLight } from '@uiw/codemirror-theme-basic'
import { loadLanguage } from '@uiw/codemirror-extensions-langs';

import React, { useEffect } from 'react';
function CodeEditor({
  content,
  setContent,
  showLineNumbers,
  resizeTabSize,
  settingsFontSize,
  settingsFontColor,
  spellCheckOn,
  theme,
  currentFileHandle,
  autosaveOn,
  autosaveTime,
  syntaxOn,
  selectedLang,
}) {

  const onChange = React.useCallback(async (val, viewUpdate) => {
    setContent(val);
  }, [setContent]);

  useEffect(() => {
    const interval = setInterval(async () => {
      // Save the content every 10 seconds
      // console.log(autosaveOn)
      if (autosaveOn === true && currentFileHandle) {
        let stream = await currentFileHandle.createWritable();
        await stream.write(content);
        await stream.close();
        console.log('Content saved');
      }
    }, autosaveTime * 1000); // Every 10 seconds

  return () => clearInterval(interval); // Clear the interval 
  }, [autosaveTime, autosaveOn, content, currentFileHandle]);

  const themeStyles = {
    "&": {
      fontSize: `${settingsFontSize}px`,
      color: settingsFontColor,
      background: theme === 'dark' ? '#4f4f4e' : '#ffffff',
    },
    ".cm-gutters": {
      backgroundColor: theme === 'dark' ? '#6e6d6d' : '#e0dede',
      color: theme === 'dark' ? 'white' : 'black',
      border: theme === 'dark' ? '5px black' : 'white',
    },
  };

  const fontSizeExtension = EditorView.theme(themeStyles);
  const fontColorExtension = EditorView.theme(themeStyles);

  const extensions = [
    fontSizeExtension,
    fontColorExtension,
    EditorView.contentAttributes.of({ spellcheck: spellCheckOn }),
  ];

  // enable syntax highlighting
  if (syntaxOn && selectedLang !== "none") {
    extensions.push(loadLanguage(selectedLang));
}

  const basicSetup = {
    lineNumbers: showLineNumbers,
    tabSize: resizeTabSize,
  };

  return (
    <CodeMirror
      value={content}
      height="90vh"
      theme={theme === 'dark' ? basicDark : basicLight}
      onChange={onChange}
      extensions={extensions}
      basicSetup={basicSetup}
    />
  );
}

export default CodeEditor;
