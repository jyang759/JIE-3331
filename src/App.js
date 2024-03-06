import React, { useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.js';
import Toolbar from './components/Toolbar';
import { Sidebar } from './components/sidebar.js';

let counter = 0;

function App() {

  //Text content 
  const [currentContent, setContent] = useState("");

  //File states for saving files
  const [currentFileHandle, setCurrentFileHandle] = useState();
  const [currentFileName, setCurrentFileName] = useState();

  //Setting states for settings
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(4);
  const [fontSize, setFontSize] = useState(15);
  const [fontColor, setFontColor] = useState('#000000');
  const [spellCheck, setSpellCheck] = useState(false);

  const [openFiles, setOpenFiles] = useState([
    {
      name: `Untitled-${counter}`, 
      content: "",
      id: counter
    }
  ]);

  const [activeTab, setActiveTab] = useState(counter);

  useEffect(() => {
    const activeFile = openFiles.find(file => file.id === activeTab);
    if (activeFile) {
      setContent(activeFile.content);
    } else {
      setContent("");
    }
  }, [activeTab, openFiles])

  function switchTab(tabID){
    setOpenFiles(prevFiles => {
    const fileToUpdateIndex = prevFiles.findIndex(file => file.id === activeTab);
    if (fileToUpdateIndex !== -1) {
      const fileToUpdate = prevFiles[fileToUpdateIndex];
      const newFiles = prevFiles;
      newFiles.splice(fileToUpdateIndex, 1, {
          ...fileToUpdate,
        content: currentContent
      })
        return newFiles;
    }
    return prevFiles;
  })
    setActiveTab(tabID);
  }

  function addToOpenFiles(){
    const newFile = {
      name: `Untitled-${counter+1}`,
      content: "",
      id: ++counter
    };
    setOpenFiles(prevFiles => [...prevFiles, newFile]);
    setActiveTab(newFile.id);
  }

  function closeTab(tabID) {
    setOpenFiles(prevFiles => {
      const remainingFiles = openFiles.filter(file => file.id !== tabID);
      if (remainingFiles.length === 0) { //this is defaulted but we need to find a way to deal when all the tabs are deleted
        remainingFiles.push({
          name: "deleted all tabs!",
          content: "",
          id: ++counter
        });
        setActiveTab(remainingFiles[0].id);
      } else {
        if (prevFiles.length === 1 && prevFiles[0].name === "deleted all tabs!") {
          setActiveTab(prevFiles[0].id);
        } else {
          const closeTabIndex = prevFiles.findIndex(file => file.id === tabID);
          if(tabID === activeTab) {
          const nextActiveTabIndex = closeTabIndex > 0 ? closeTabIndex - 1 : 0;
          //console.log(prevFiles)
          setActiveTab(prevFiles[nextActiveTabIndex].id);
          }
        }
      }
      return remainingFiles;
    });
  }

  return (
    <div className="App">
      <Sidebar content={currentContent} setContent={setContent} 
      currentFileHandle={currentFileHandle} setCurrentFileHandle={setCurrentFileHandle} setCurrentFileName={setCurrentFileName} 

      // settings
      showLineNumbers={showLineNumbers} setShowLineNumbers={setShowLineNumbers}
      tabSize={tabSize} setTabSize={setTabSize}
      fontSize={fontSize} setFontSize={setFontSize}
      fontColor={fontColor} setFontColor={setFontColor}
      spellChecking={spellCheck} setSpellChecking={setSpellCheck}
      />
      <div className="vertical-container">
        <Toolbar currentFileName={currentFileName}
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
        ></Toolbar>
        <CodeEditor
          setContent={setContent} content={currentContent}
          //settings
          showLineNumbers={showLineNumbers}
          resizeTabSize={tabSize}
          settingsFontSize={fontSize}
          settingsFontColor={fontColor}
          spellCheckOn={spellCheck}
        ></CodeEditor>
      </div>
    </div>
  );
}

export default App;
