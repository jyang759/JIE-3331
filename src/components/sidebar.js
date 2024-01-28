import React, { useState } from 'react';
import './Sidebar.css'; // Import your CSS file for styling

export function Sidebar({ content, setContent, setUpdateContent}) {
    const [isSettingsView, setSettingsView] = useState(false);

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
            setUpdateContent(true);
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

    function newButton() {
        // test function for now
        console.log(content);
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
                    <li>More</li>
                </ul>
            ) : (
                <ul className="sidebar-links">
                    <li><div onClick={newButton}>New</div></li>
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
