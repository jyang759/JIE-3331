import React, { useState } from 'react';
import './Sidebar.css'; // Import your CSS file for styling

export function Sidebar({ content, setContent, tabSize, setTabSize}) {
    const [isSettingsView, setSettingsView] = useState(false);

    const handleTabSizeChange = (event) => {
        setTabSize(parseInt(event.target.value));
    };


    const toggleView = () => {
        setSettingsView(!isSettingsView);
    };

    const handleSave = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "textEditorContent.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    async function open() {
        try {
            let fileHandler;
            [fileHandler] = await window.showOpenFilePicker();
            let file = await fileHandler.getFile();
            let fileContents = await file.text();
            setContent(fileContents);
        } catch(error) {
            console.log(error);
        }
    }

    async function saveAs() {
        try {
            let fileHandler = await window.showSaveFilePicker();
            let stream = await fileHandler.createWritable();
            await stream.write(content);
            await stream.close();
        } catch(error) {
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
                <li>Line Numbers <input type='checkbox' /></li>
                <li>Tab Size<input type="number" value={tabSize} onChange={handleTabSizeChange} /></li>
                <li>More</li>
                </ul>
            ) : (
                <ul className="sidebar-links">
                    <li>New</li>
                    <li><div onClick={open}>Open</div></li>
                    <li><div onClick={handleSave}>Save</div></li>
                    <li><div onClick={saveAs}>Save As</div></li>
                </ul>
            )}

            <div className="bottom-links" onClick={toggleView}>
                <div>{isSettingsView ? 'Back' : 'Settings'}</div>
            </div>
        </div>
    );
};
