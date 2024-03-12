# ChromeOS Text 2.0

ChromeOS Text 2.0 is a collaborative project between the Group 3331 of CS 3312 Section JIE and Google to create a next-generation text editor for Chromebooks. This project aims to replace the existing ChromeOS Text with a more advanced and user-friendly rich text editor built with React.

## Overview

- **Project Name:** ChromeOS Text 2.0
- **Collaborators:** Georgia Institute of Technology College of Computing, Google
- **Technology Stack:** React and Jasmine
- **Target Platform:** Google Chromebooks

## Features

- **Simple Rich Text Editing:** ChromeOS Text 2.0 provides a user-friendly and intuitive rich text editing experience.
- **Built for Chromebooks:** Specifically designed and optimized for integration into Google's Chromebooks.
- **Modern Technology Stack:** Leveraging the power of React for a responsive and dynamic user interface.

# Release Notes

## Release v0.3.0
### New Features
- Open and close multiple text windows
- Change font Color
- Use spell check
## Bug Fixes
- Save button now works for newly created files
## Known Issues
- Closing last open window creates a new window
- Font, color, and tab size are changed for all windows
- New windows will not change to a new file name

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

# Getting Started

To use ChromeOS Text 2.0 on your Chromebook, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/jyang759/JIE-3331.git
   ```
2. **Change directory:**
   ```bash
   cd JIE-3331
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Install React Icons:**
   ```bash
   npm install react-icons --save
   ```
   
5. **Install React-CodeMirror and CodeMirror Themes:** 
   ```bash
   npm install @uiw/react-codemirror --save
   npm install @uiw/codemirror-theme-dracula --save
   ```
   
6. **Run the App:**
   ```bash
   npm start
   ```



   The app will be accessible at [http://localhost:3000](http://localhost:3000).

## Contact

For inquiries about the project, please contact:

- [Justin Yang] - [jyang759@gatech.edu]
- [Jesse Johnston] - [jessejames@google.com]

---


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
