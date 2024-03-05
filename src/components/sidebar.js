import React, { useState } from 'react';
import './Sidebar.css';
import ColorPicker from './ColorPicker';

export function Sidebar({ content, setContent, currentFileHandle, setCurrentFileHandle, setCurrentFileName, showLineNumbers, setShowLineNumbers, tabSize, setTabSize, fontSize, setFontSize, fontColor, setFontColor }) {
    const [isSettingsView, setSettingsView] = useState(false);
    const [isLoading, setLoading] = useState(false); // New state for loading feedback
    const [error, setError] = useState(''); // New state for error messages

    const toggleView = () => {
        setSettingsView(!isSettingsView);
    };

    const handleTabSizeChange = (event) => {
        setTabSize(parseInt(event.target.value));
    };

    const handleFontSizeChange = (event) => {
        setFontSize(parseInt(event.target.value));
    };

    // New function to handle writing to file to reduce duplication
    const writeFile = async (fileHandle, contents) => {
        if (!fileHandle) return;
        let stream = await fileHandle.createWritable();
        await stream.write(contents);
        await stream.close();
    };

    // Modified function for opening files with error handling and loading state
    async function open() {
        setLoading(true);
        setError('');
        try {
            [currentFileHandle] = await window.showOpenFilePicker();
            const file = await currentFileHandle.getFile();
            const fileContents = await file.text();
            setContent(fileContents);
            setCurrentFileHandle(currentFileHandle);
            setCurrentFileName(file.name);
        } catch (error) {
            setError('Failed to open file. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Modified save function using writeFile
    async function save() {
        setLoading(true);
        setError('');
        try {
            await writeFile(currentFileHandle, content);
        } catch (error) {
            setError('Failed to save file. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Modified saveAs function using writeFile
    async function saveAs() {
        setLoading(true);
        setError('');
        try {
            const newFileHandle = await window.showSaveFilePicker();
            await writeFile(newFileHandle, content);
            setCurrentFileHandle(newFileHandle); // Update file handle after saving as a new file
        } catch (error) {
            setError('Failed to save file as. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="sidebar">
            {error && <p className="error-message">{error}</p>} {/* Display error messages */}
            {isLoading && <p>Loading...</p>} {/* Loading feedback */}
            <div className="logo-container">
                <div className="logo">Text 2.0</div>
                <div className="logo-line"></div>
            </div>
            {isSettingsView ? (
                <ul className="sidebar-links">
                    <li>
                        Line Numbers
                        <input
                            type='checkbox'
                            checked={showLineNumbers}
                            onChange={() => setShowLineNumbers(!showLineNumbers)}
                            aria-label="Toggle line numbers" // Improved accessibility
                        />
                    </li>
                    <li>
                        Tab Size
                        <input
                            type="number"
                            value={tabSize}
                            onChange={handleTabSizeChange}
                            aria-label="Set tab size" // Improved accessibility
                        />
                    </li>
                    <li>
                        Font Size
                        <input
                            type="number"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            aria-label="Set font size" // Improved accessibility
                        />
                    </li>
                    <li>
                        <ColorPicker onColorChange={(color) => setFontColor(color)}></ColorPicker>
                    </li>
                </ul>
            ) : (
                <ul className="sidebar-links">
                    <li>New</li>
                    <li><div onClick={open} role="button" tabIndex="0">Open</div></li> {/* Improved accessibility */}
                    <li><div onClick={save} role="button" tabIndex="0">Save</div></li> {/* Improved accessibility */}
                    <li><div onClick={saveAs} role="button" tabIndex="0">Save As</div></li> {/* Improved accessibility */}
                </ul>
            )}
            <div className="bottom-links" onClick={toggleView} role="button" tabIndex="0"> {/* Improved accessibility */}
                <div>{isSettingsView ? 'Back' : 'Settings'}</div>
            </div>
        </div>
    );
};
