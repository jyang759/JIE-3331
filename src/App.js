import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar';
import { getLanguageFromFileName } from './languages';

let counter = 0;

function App() {
  
  //File stuff
  const [content, setContent] = useState("");
  const [activeFileHandle, setActiveFileHandle] = useState();
  const [activeFileName, setActiveFileName] = useState("Untitled");
  const [currentFileHandle, setCurrentFileHandle] = useState();
  const [fileNameChanged, setFileNameChanged] = useState(false)
  const [fileSaved, setFileSaved] = useState(false)
  const [currentFileName, setCurrentFileName] = useState("Untitled");

  //Setting options
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(4);
  const [fontSize, setFontSize] = useState(15);
  const [fontColor, setFontColor] = useState('#000000');
  const [spellCheck, setSpellCheck] = useState(false);
  const [autosaveOn, setAutosaveOn] = useState(false);
  const [autosaveTime, setAutosaveTime] = useState(10); // default is 10 seconds //I might have to set the min to be 1 cuz 0 might be buggy
  const [syntaxOn, setSyntaxOn] = useState(true);
  const [selectedLang, setSelectedLang] = useState("none");
  const [langDetection, setLangDetection] = useState(true);

  //Misc 
  const [openFiles, setOpenFiles] = useState([{ name: `Untitled`, content: "", id: counter, fileHandle: undefined, savedContent: "" }]);
  const [activeTab, setActiveTab] = useState(counter);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const activeFile = openFiles.find(file => file.id === activeTab);
    if (activeFile) {
      setContent(activeFile.content);
      setActiveFileHandle(activeFile.fileHandle)
      if(langDetection && activeFile.name && getLanguageFromFileName(activeFile.name)) {
        setSelectedLang(getLanguageFromFileName(activeFile.name));
      } else {
        if(langDetection) {
          setSelectedLang("none");
        }
      }
    } else {
      setContent("");
      setActiveFileHandle(undefined);
      if(langDetection) {
        setSelectedLang("none");
      }
    }
    console.log(openFiles)
  }, [activeTab, openFiles, langDetection]);

  useEffect(() => {
    // calls editFileInfo when content changes for the active tab
    editFileInfo(content);
  }, [content])

  useEffect(() => {
    // Update the name of the active tab when currentFileName and fileNameChanged changes
    setActiveFileName(currentFileName)
    editFileInfo(undefined, activeFileName, undefined, undefined);
  }, [fileNameChanged]);

  useEffect(() => {
    editFileInfo(undefined, undefined, undefined, content);
  }, [fileSaved]);

  useEffect(() => {
    // Update the name of the active tab when activeFileName changes
    editFileInfo(undefined, activeFileName, undefined, content);
  }, [activeFileName]);

  useEffect(() => {
    // Update the file handle when currentFileHandle changes
    editFileInfo(undefined, undefined, currentFileHandle);
  }, [currentFileHandle]);

  const editFileInfo = (newContent = undefined, newName = undefined, newFileHandle = undefined, newSavedContent = undefined, fileId = activeTab) => {
    setOpenFiles(prevFiles => {
      return prevFiles.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            content: newContent !== undefined ? String(newContent) : file.content,
            name: newName !== undefined ? String(newName) : file.name,
            fileHandle: newFileHandle !== undefined ? newFileHandle : file.fileHandle,
            savedContent: newSavedContent !== undefined ? String(newSavedContent) : file.savedContent
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
    const newFile = { name: `Untitled`, content: "", id: newID, fileHandle: undefined, savedContent: "" };
    setOpenFiles(prevFiles => [...prevFiles, newFile]);
    setActiveTab(newID);
  }, []);

  const closeTab = useCallback((tabID) => {
    setOpenFiles(prevFiles => {
      const remainingFiles = prevFiles.filter(file => file.id !== tabID);
      if (remainingFiles.length === 0) {
        const newID = ++counter;
        const newTab = { name: `Untitled`, content: "", id: newID, fileHandle: undefined, savedContent: "" };
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
        currentFileHandle={activeFileHandle} // uses activeFileHandle because the sidebar buttons should affect the active file
        setCurrentFileHandle={setCurrentFileHandle}
        currentFileName={currentFileName}
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
        fileNameChanged={fileNameChanged}
        setFileNameChanged={setFileNameChanged}
        autosaveOn = {autosaveOn}
        setAutosaveOn = {setAutosaveOn}
        autosaveTime = {autosaveTime}
        setAutosaveTime = {setAutosaveTime}
        syntaxOn = {syntaxOn}
        setSyntaxOn = {setSyntaxOn}
        selectedLang = {selectedLang}
        setSelectedLang = {setSelectedLang}
        langDetection = {langDetection}
        setLangDetection = {setLangDetection}
        fileSaved = {fileSaved}
        setFileSaved = {setFileSaved}
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
          currentFileHandle={activeFileHandle}
          autosaveOn = {autosaveOn}
          autosaveTime = {autosaveTime}
          syntaxOn = {syntaxOn}
          selectedLang = {selectedLang}
          fileSaved = {fileSaved}
          setFileSaved = {setFileSaved}
        />
      </div>
    </div>
  );
}

export default App;
