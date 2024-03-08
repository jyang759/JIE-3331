import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar';

let counter = 0;

function App() {
  const [currentContent, setContent] = useState("");
  const [currentFileHandle, setCurrentFileHandle] = useState();
  const [currentFileName, setCurrentFileName] = useState("");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(4);
  const [fontSize, setFontSize] = useState(15);
  const [fontColor, setFontColor] = useState('#000000');
  const [spellCheck, setSpellCheck] = useState(false);
  const [openFiles, setOpenFiles] = useState([{ name: `Untitled-${counter}`, content: "", id: counter }]);
  const [activeTab, setActiveTab] = useState(counter);

  useEffect(() => {
    const activeFile = openFiles.find(file => file.id === activeTab);
    if (activeFile) {
      setContent(activeFile.content);
    } else {
      setContent("");
    }
  }, [activeTab, openFiles]);

  const switchTab = useCallback((tabID) => {
    setOpenFiles(prevFiles => {
      return prevFiles.map(file => file.id === activeTab ? { ...file, content: currentContent } : file);
    });
    setActiveTab(tabID);
  }, [activeTab, currentContent]);

  const addToOpenFiles = useCallback(() => {
    const newID = ++counter;
    const newFile = { name: `Untitled-${newID}`, content: "", id: newID };
    setOpenFiles(prevFiles => [...prevFiles, newFile]);
    setActiveTab(newID);
  }, []);

  const closeTab = useCallback((tabID) => {
    setOpenFiles(prevFiles => {
      const remainingFiles = prevFiles.filter(file => file.id !== tabID);
      if (remainingFiles.length === 0) {
        const newID = ++counter;
        const newTab = { name: `Untitled-${newID}`, content: "", id: newID };
        remainingFiles.push(newTab);
        setActiveTab(newID);
      } else {
        if (tabID === activeTab) {
          const newActive = remainingFiles[0].id;
          setActiveTab(newActive);
        }
      }
      return remainingFiles;
    });
  }, [activeTab]);

  return (
    <div className="App">
      <Sidebar 
        content={currentContent} 
        setContent={setContent}
        currentFileHandle={currentFileHandle} 
        setCurrentFileHandle={setCurrentFileHandle} 
        setCurrentFileName={setCurrentFileName}
        showLineNumbers={showLineNumbers} 
        setShowLineNumbers={setShowLineNumbers}
        tabSize={tabSize} 
        setTabSize={setTabSize}
        fontSize={fontSize} 
        setFontSize={setFontSize}
        fontColor={fontColor} 
        setFontColor={setFontColor}
        spellChecking={spellCheck} 
        setSpellChecking={setSpellCheck}
        addToOpenFiles={addToOpenFiles}
      />
      <div className="vertical-container">
        <Toolbar 
          currentFileName={currentFileName}
          currentFileHandle={currentFileHandle} 
          setCurrentFileHandle={setCurrentFileHandle} 
          setCurrentFileName={setCurrentFileName}
          setContent={setContent}
          openFiles={openFiles}
          addToOpenFiles={addToOpenFiles}
          setActiveTab={switchTab}
          activeTab={activeTab}
          setOpenFiles={setOpenFiles}
          closeTab={closeTab}
        />
        <CodeEditor
          setContent={setContent} 
          content={currentContent}
          showLineNumbers={showLineNumbers}
          resizeTabSize={tabSize}
          settingsFontSize={fontSize}
          settingsFontColor={fontColor}
          spellCheckOn={spellCheck}
        />
      </div>
    </div>
  );
}

export default App;
