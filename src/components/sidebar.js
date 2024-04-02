import React, { useState } from 'react';
import './Sidebar.css';
import ColorPicker from './ColorPicker';

const SidebarSettings = ({
    showLineNumbers, setShowLineNumbers,
    tabSize, setTabSize,
    fontSize, setFontSize,
    setFontColor,
    spellChecking, setSpellChecking,
    autosaveOn, setAutosaveOn,
    autosaveTime, setAutosaveTime, theme
}) => (
    <ul className="sidebar-links">
        <li>Line Numbers <input type="checkbox" checked={showLineNumbers} onChange={() => setShowLineNumbers(prev => !prev)} /></li>
        <li>Tab Size<input className="num" type="number" value={tabSize} onChange={e => setTabSize(parseInt(e.target.value))} /></li>
        <li>Font Size<input className="num" type="number" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} /></li>
        <li><ColorPicker onColorChange={setFontColor} theme={theme}></ColorPicker></li>
        <li>Spell Check <input type="checkbox" checked={spellChecking} onChange={() => setSpellChecking(prev => !prev)} /></li>
        <li>Autosave <input type="checkbox" checked={autosaveOn} onChange={() => setAutosaveOn(prev => !prev)} /></li>
        <li>Autosave Timer <input className="num" type="number" value={autosaveTime} onChange={e => setAutosaveTime(parseInt(e.target.value))} /></li>
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
    const { content, setContent, currentFileHandle, setCurrentFileHandle, setCurrentFileName, addToOpenFiles, sidebarVisible, fileNameChanged, setFileNameChanged } = props;
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
                let stream = await currentFileHandle.createWritable();
                await stream.write(content);
                await stream.close();
            } else if (action === "saveAs") {
                let fileHandle = await window.showSaveFilePicker();
                let stream = await fileHandle.createWritable();
                await stream.write(content);
                await stream.close();
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
