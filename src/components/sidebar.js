import React, { useState } from 'react';
import './Sidebar.css'; // Import your CSS file for styling
import ColorPicker from './ColorPicker';

export function Sidebar({ content, setContent,
    currentFileHandle, setCurrentFileHandle, setCurrentFileName,
    showLineNumbers, setShowLineNumbers,
    tabSize, setTabSize,
    fontSize, setFontSize, fontColor, setFontColor }) {
    const [isSettingsView, setSettingsView] = useState(false);

    const toggleView = () => {
        setSettingsView(!isSettingsView);
    };

    const handleTabSizeChange = (event) => {
        setTabSize(parseInt(event.target.value));
    };

    const handleFontSizeChange = (event) => {
        setFontSize(parseInt(event.target.value));
    };

    //Function for opening files from directory
    async function open() {
        try {
            let fileHandle;
            [fileHandle] = await window.showOpenFilePicker();
            let file = await fileHandle.getFile();
            let fileContents = await file.text();
            let fileName = await file.name;
            setContent(fileContents);
            setCurrentFileHandle(fileHandle);
            setCurrentFileName(fileName);
        } catch (error) {
            console.log(error);
        }
    }

    //Function for saving a file to the file system
    async function save() {
        try {
            let fileHandle = currentFileHandle;
            let stream = await fileHandle.createWritable();
            await stream.write(content);
            await stream.close();
        } catch (error) {
            console.log(error);
        }
    }

    //Function for saving a file to the file system and changing its name and file type
    async function saveAs() {
        try {
            let fileHandle = await window.showSaveFilePicker();
            let stream = await fileHandle.createWritable();
            await stream.write(content);
            await stream.close();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo">Text 2.0</div>
                <div className="logo-line"></div>
            </div>

            {isSettingsView ? (
                <ul className="sidebar-links">
                    <li>Line Numbers <input type='checkbox' checked={showLineNumbers} onChange={() => setShowLineNumbers(!showLineNumbers)} /></li>
                    <li>Tab Size<input type="number" value={tabSize} onChange={handleTabSizeChange} /></li>
                    <li>Font Size<input type="number" value={fontSize} onChange={handleFontSizeChange} /></li>
                    <li ><ColorPicker onColorChange={(color) => setFontColor(color)}></ColorPicker></li>
                </ul>
            ) : (
                <ul className="sidebar-links">
                    <li>New</li>
                    <li><div onClick={open}>Open</div></li>
                    <li><div onClick={save}>Save</div></li>
                    <li><div onClick={saveAs}>Save As</div></li>
                </ul>
            )}

            <div className="bottom-links" onClick={toggleView}>
                <div>{isSettingsView ? 'Back' : 'Settings'}</div>
            </div>
        </div>
    );
};
