import React, { useState } from 'react';
import './Sidebar.css';
import ColorPicker from './ColorPicker';

const SidebarSettings = ({
    showLineNumbers, setShowLineNumbers,
    tabSize, setTabSize,
    fontSize, setFontSize,
    setFontColor,
    spellChecking, setSpellChecking,
}) => (
    <ul className="sidebar-links">
        <li>Line Numbers <input type="checkbox" checked={showLineNumbers} onChange={() => setShowLineNumbers(prev => !prev)} /></li>
        <li>Tab Size<input className="num" type="number" value={tabSize} onChange={e => setTabSize(parseInt(e.target.value))} /></li>
        <li>Font Size<input className="num" type="number" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} /></li>
        <li><ColorPicker onColorChange={setFontColor}></ColorPicker></li>
        <li>Spell Check <input type="checkbox" checked={spellChecking} onChange={() => setSpellChecking(prev => !prev)} /></li>
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
    const { content, setContent, currentFileHandle, setCurrentFileHandle, setCurrentFileName, addToOpenFiles } = props;
    
    const [isSettingsView, setSettingsView] = useState(false);
    const [isNewFile, setIsNewFile] = useState(true);

    const toggleView = () => setSettingsView(prev => !prev);

    const handleFileInteraction = async (action) => {
        try {
            if (action === "open") {
                let [fileHandle] = await window.showOpenFilePicker();
                let file = await fileHandle.getFile();
                setContent(await file.text());
                setCurrentFileHandle(fileHandle);
                setCurrentFileName(file.name);
            } else if (action === "save") {
                if (isNewFile || !currentFileHandle) {
                    await handleFileInteraction("saveAs");
                    return;
                } else {
                    let stream = await currentFileHandle.createWritable();
                    await stream.write(content);
                    await stream.close();
                }
            } else if (action === "saveAs") {
                let fileHandle = await window.showSaveFilePicker();
                let stream = await fileHandle.createWritable();
                await stream.write(content);
                await stream.close();
                setCurrentFileHandle(fileHandle);
                setCurrentFileName(fileHandle.name);
                setIsNewFile(false);
            } else if (action === "newFile") {
                addToOpenFiles();
                setIsNewFile(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
