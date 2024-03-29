import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar';

let counter = 0;

function App() {
  const [content, setContent] = useState("");
  const [currentFileHandle, setCurrentFileHandle] = useState();
  const [currentFileName, setCurrentFileName] = useState("Untitled");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(4);
  const [fontSize, setFontSize] = useState(15);
  const [fontColor, setFontColor] = useState('#000000');
  const [spellCheck, setSpellCheck] = useState(false);
  const [openFiles, setOpenFiles] = useState([{ name: `Untitled`, content: "", id: counter }]);
  const [activeTab, setActiveTab] = useState(counter);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const activeFile = openFiles.find(file => file.id === activeTab);
    if (activeFile) {
      setContent(activeFile.content);
    } else {
      setContent("");
    }
  }, [activeTab, openFiles]);

  useEffect(() => {
    // calls editFileInfo when content changes for the active tab
    editFileInfo(content);
  }, [content])

  useEffect(() => {
    // Update the name of the active tab when currentFileName changes
    editFileInfo(undefined, currentFileName);
}, [currentFileName]);

  const editFileInfo = (newContent = undefined, newName = undefined, fileId = activeTab) => {
    setOpenFiles(prevFiles => {
      return prevFiles.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            content: newContent !== undefined ? String(newContent) : file.content,
            name: newName !== undefined ? String(newName) : file.name
          };
        }
        return file;
      });
    });
  };

  const switchTab = useCallback((tabID) => {
    setActiveTab(tabID);
  }, [activeTab, content]);

  const addToOpenFiles = useCallback(() => {
    const newID = ++counter;
    const newFile = { name: `Untitled`, content: "", id: newID };
    setOpenFiles(prevFiles => [...prevFiles, newFile]);
    setActiveTab(newID);
  }, []);

  const closeTab = useCallback((tabID) => {
    setOpenFiles(prevFiles => {
      const remainingFiles = prevFiles.filter(file => file.id !== tabID);
      if (remainingFiles.length === 0) {
        const newID = ++counter;
        const newTab = { name: `Untitled`, content: "", id: newID };
        remainingFiles.push(newTab);
        setActiveTab(newID);
      } else {
        if (tabID === activeTab) {
          const closedTabIndex = prevFiles.findIndex(file => file.id === tabID);
          const newActive = remainingFiles[closedTabIndex] ? remainingFiles[closedTabIndex].id : remainingFiles[closedTabIndex - 1].id;
          setActiveTab(newActive);
        }
      }
      return remainingFiles;
    });
  }, [activeTab]);

  return (
    <div className="App" id={theme}>
      <Sidebar
        content={content}
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
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
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
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          theme={theme}
          setTheme={setTheme}
        />
        <CodeEditor
          setContent={setContent}
          content={content}
          showLineNumbers={showLineNumbers}
          resizeTabSize={tabSize}
          settingsFontSize={fontSize}
          settingsFontColor={fontColor}
          spellCheckOn={spellCheck}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default App;
