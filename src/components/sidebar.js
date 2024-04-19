import React, { useState } from 'react';
import './Sidebar.css';
import ColorPicker from './ColorPicker';
import LanguageOptions from './LanguageOptions';
import SavingOptions from './SavingOptions';
import TextFormatingOptions from './TextFormatingOptions';

const SidebarSettings = ({
    showLineNumbers, setShowLineNumbers,
    tabSize, setTabSize,
    fontSize, setFontSize,
    setFontColor,
    spellChecking, setSpellChecking,
    autosaveOn, setAutosaveOn,
    autosaveTime, setAutosaveTime, theme,
    syntaxOn, setSyntaxOn,
    selectedLang, setSelectedLang,
    langDetection, setLangDetection,
}) => (
    <ul className="sidebar-links">
        <TextFormatingOptions
        showLineNumbers = {showLineNumbers}
        setShowLineNumbers = {setShowLineNumbers}
        tabSize = {tabSize}
        setTabSize = {setTabSize}
        fontSize = {fontSize}
        setFontSize = {setFontSize}
        />
       
        <SavingOptions 
        autosaveOn = {autosaveOn}
        setAutosaveOn = {setAutosaveOn}
        autosaveTime = {autosaveTime}
        setAutosaveTime = {setAutosaveTime}
        />

        <LanguageOptions 
        syntaxOn = {syntaxOn}
        setSyntaxOn = {setSyntaxOn}
        langDetection = {langDetection}
        setLangDetection = {setLangDetection}
        selectedLang = {selectedLang}
        setSelectedLang = {setSelectedLang}
        spellChecking = {spellChecking}
        setSpellChecking = {setSpellChecking}
        />
    </ul>
);

const SidebarLinks = ({ newFile, open, save, saveAs }) => (
    <ul className="sidebar-links">
        <li><div onClick={newFile}> New</div></li>
        <li><div onClick={open}>Open</div></li>
        <li><div onClick={save}>Save</div></li>
        <li><div onClick={saveAs}>Save As</div></li>
    </ul>
);

export function Sidebar(props) {
    const { content, setContent, currentFileHandle, setCurrentFileHandle, currentFileName, setCurrentFileName, addToOpenFiles, sidebarVisible, fileNameChanged, setFileNameChanged, fileSaved, setFileSaved } = props;
    const [isSettingsView, setSettingsView] = useState(false);

    const toggleView = () => setSettingsView(prev => !prev);

    const handleFileInteraction = async (action) => {
        try {
            if (action === "open") {
                let [fileHandle] = await window.showOpenFilePicker();
                let file = await fileHandle.getFile();
                setContent(await file.text());
                setCurrentFileHandle(fileHandle);
                setCurrentFileName(file.name);
                setFileNameChanged(!fileNameChanged);
            } else if (action === "save") {
                if (currentFileHandle == null) {
                    let fileHandle = await window.showSaveFilePicker();
                    let stream = await fileHandle.createWritable();
                    await stream.write(content);
                    await stream.close();
                    let file = await fileHandle.getFile();
                    setCurrentFileHandle(fileHandle);
                    setCurrentFileName(file.name);
                    setFileNameChanged(!fileNameChanged);
                } else {
                    let stream = await currentFileHandle.createWritable();
                    await stream.write(content);
                    await stream.close();
                    setFileSaved(!fileSaved);
                }
            } else if (action === "saveAs") {
                let fileHandle = await window.showSaveFilePicker();
                let stream = await fileHandle.createWritable();
                await stream.write(content);
                await stream.close();
                console.log("here");
                if (currentFileHandle == null) {
                    let file = await fileHandle.getFile();
                    setCurrentFileHandle(fileHandle);
                    setCurrentFileName(file.name);
                    setFileNameChanged(!fileNameChanged);
                }
            } else if (action === "newFile") {
                addToOpenFiles();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!sidebarVisible) {
        return null;
    }

    return (
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo">Text 2.0</div>
                <div className="logo-line"></div>
            </div>
            {isSettingsView ?
                <SidebarSettings {...props} /> :
                <SidebarLinks
                    newFile={() => handleFileInteraction("newFile")}
                    open={() => handleFileInteraction("open")}
                    save={() => handleFileInteraction("save")}
                    saveAs={() => handleFileInteraction("saveAs")}
                />
            }
            <div className="bottom-links" onClick={toggleView}>
                <div>{isSettingsView ? 'Back' : 'Settings'}</div>
            </div>
        </div>
    );
};
