import React, { useState } from 'react';
import './Sidebar.css'; // Import your CSS file for styling

export function Sidebar({ content }) {
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
                    <li>New</li>
                    <li>Open</li>
                    <li><div onClick={handleSave}>Save</div></li>
                    <li>Save As</li>
                </ul>
            )}

            <div className="bottom-links" onClick={toggleView}>
                <div>{isSettingsView ? 'Back' : 'Settings'}</div>
            </div>
        </div>
    );
};
