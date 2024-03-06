import React, { useState } from 'react';
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
      name: "Untitled", 
      content: "",
      id: counter++
    }
  ]);

  const [activeTab, setActiveTab] = useState(counter);
  function switchTab(tabID){
    setOpenFiles(prevFiles => {
    const fileToUpdateIndex = prevFiles.findIndex(file => file.id === activeTab);
    const fileToUpdate = prevFiles[fileToUpdateIndex];
    const newFiles = prevFiles;
    newFiles.splice(fileToUpdateIndex, 1, {
        ...fileToUpdate,
      content: currentContent
    })
      return newFiles;
  })
    setActiveTab(tabID);
    setContent(openFiles.find(file => file.id === tabID).content);

  }

  function addToOpenFiles(){
    setOpenFiles(prevFiles => [
      ...prevFiles,
      {
        name: "Untitled",
        content: "",
        id: counter++
      }
    ]);
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
