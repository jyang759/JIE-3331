# ChromeOS Text 2.0

ChromeOS Text 2.0 is a collaborative project between Group 3331 of CS 3312 Section JIE and Google to create a next-generation text editor for Chromebooks. This project aims to replace the existing ChromeOS Text with a more advanced and user-friendly text editor built with React.

## Overview

- **Project Name:** ChromeOS Text 2.0
- **Collaborators:** Team 3331, Google
- **Technology Stack:** React
- **Target Platform:** ChromeOS

# Release Notes

## Release v1.0.0
### New Features
- Core file editing functionality (Open, New File, Save, Save As)
- File tabs (open multiple text files at once and switch between them using tabs)
- Editor options (line numbers, tab size, font size, whitespace, spell check)
- UI options (light/dark mode, character count display, show/hide sidebar)
- Developer features (syntax highlighting, code autocompletion, programming language detection, bracket matching, auto-indent)
- Additional features (autosave, find and replace)

### Bug fixes
- File names are now properly displayed on the tabs
- Fixed bugs that caused the incorrect file contents to be shown in certain situations
- Correct tab is now selected after a tab is closed
- "Save/Save As" now has proper functionality for Untitled files
- "New" button functionality is fixed and works with the tab functionality
- Fixed various bugs related to reopening files
- Fixed unsaved changes indicator bugs

### Known Issues
- Pressing tab indents at the beginning of the line and not at the location of the cursor
- Files cannot be renamed by double clicking the file name

## Release v0.4.0
### New Features
- Added light/dark mode functionality
- Added open/hide sidebar functionality
- Autosave at intervals set by the user
- Added find/replace functionality
### Bug Fixes
- File names are now properly displayed on the tabs
- Fixed bugs that caused the incorrect file contents to be shown in certain situations
- Correct tab is now selected after a tab is closed
### Known Issues
- Pressing tab indents at the beginning of the line and not at the location of the cursor
- Opening a file with the same name as the previous file will result in an incorrect tab name

## Release v0.3.0
### New Features
- Basic tab functionality - open files in new tabs and switch between them
- Added the ability to change font color in settings
- Adding the ability to enable/disable misspelling correction in settings
### Bug Fixes
- "Save" button now works for newly created files
- "New" button functionality is fixed and works with the tab functionality
### Known Issues
- Closing the last open tab creates a new tab
- File names are not displayed on the tabs
- Closing a tab switches to the first tab instead of the rightmost tab
- Pressing tab indents at the beginning of the line and not at the location of the cursor

## Release v0.2.0
### New Features
- Added save button functionality
- Added the ability to enable/disable line numbers
- Added the ability to change tab width
- Added the ability to change font size
### Bug Fixes
- Fixed old save button functionality (the button had Save As functionality as a placeholder)
### Known Issues
- Pressing tab indents at the beginning of the line and not at the location of the cursor
  
## Release v0.1.0
### New Features
- Basic Text Functionality
- Create new text files and open existing text files
- Save files as several different file types
### Bug Fixes
- N/A
### Known Issues
- N/A


# Install Guide

## Pre-requisites
- Web browser
- Terminal/command prompt
- git (can be installed from https://git-scm.com/)
- Node.js (can be installed from https://nodejs.org/en)

## Dependent libraries
Some dependencies are required to be installed before running the application.

To install the required dependencies, run these commands in the directory of the project:
 ```bash
 npm install
 npm install react-icons --save
 npm install @uiw/react-codemirror --save
 npm install @uiw/codemirror-theme-dracula --save
 npm install @uiw/codemirror-extensions-langs --save
 npm install @uiw/codemirror-theme-basic --save
 ```

## Download instructions
### Option 1 (Using git)

Navigate to the desired directory and run this command to clone the repository:  
 ```bash
 git clone https://github.com/jyang759/JIE-3331.git
 ```

### Option 2 (Download ZIP)
Click the green "Code" button on the GitHub page and select "Download ZIP".  
![image](https://github.com/jyang759/JIE-3331/assets/93544265/76432024-abcd-4ee9-9f05-1fa1f6051334)

## Build/installation instructions
Building and installing the application is not necessary as it runs on a web browser.

To run the application, see the "run instructions" section below.

## Run instructions
1. Run the following command to start the application:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in a web browser to view the application.

## Troubleshooting
- **npm command not recognized** - Ensure that Node.js is installed (see pre-requisites section)
- **git command not recognized** - Ensure that git is installed (see pre-requisites section)
- **Module not found** - Make sure that all required dependencies are installed (see dependent libraries section)
- **Port in use** - Close any processes that are using port 3000 on your local machine before starting the applcation.
- For other errors, consider cloning/downloading the repository again to ensure a clean installation.

# Contact

For inquiries about the project, please contact:

- [Justin Yang] - [jyang759@gatech.edu]
- [Jesse Johnston] - [jessejames@google.com]
