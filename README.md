PLEASE CREATE AN Configuration.js FILE in the src WITH YOUR OWN RAPID API KEYS AND FIREBASE KEYS!

# Installing the Application short explanation:
To install and run a Node.js project, you can follow these simple steps:

**Step 1:** Open your terminal or command prompt.

**Step 2:** Type the following command and press Enter to install the project dependencies (assuming you're in the project directory):

```shell
npm install
```

This command will download and install all the required packages and dependencies for your project.

**Step 3:** After the installation is complete, type the following command and press Enter to start the project:

```shell
npm start
```

This will launch your Node.js project, and you can typically access it by opening a web browser and navigating to the specified address (often `http://localhost:3000`).

That's it! You've successfully installed and started your Node.js project. Enjoy working on your application!

PLEASE CREATE A `Configuration.js` FILE in the `src` WITH YOUR OWN RAPID API KEYS AND FIREBASE KEYS!  



# Installing the Application detailed explanation:

## 1. Open Command Prompt (as Administrator)
Start Command Prompt with administrator rights to ensure you have the necessary permissions for the installation process.

## 2. Check the Node.js Version
Use the following command to check if Node.js is already installed and to determine its version:

```shell
$ node -v
```

## 3. Install or Update Node.js
If `Node.js` is not yet installed or needs an update, download the latest version from the official Node.js website (https://nodejs.org/). Follow the installation instructions provided there.

## 4. Install Visual Studio Code
Download `Visual Studio Code (VS Code)`, a popular code editor, from the official website (https://code.visualstudio.com/). Follow the installation instructions for your specific operating system.

## 5. Get the Project from the GitHub Repository:

Navigate to the GitHub repository for your project using the following link: Netflix-Wiki-ReactApp Repository.
Click the "Code" button and choose your preferred method to download the project (ZIP download or use Git if you have it installed). Extract the ZIP file if you chose the ZIP download option.
Move or extract the project folder to the desired location on your computer.
Install Node Modules for the Project: Open a Command Prompt window and navigate to the project directory. Execute the following command to install the required Node modules, as specified in the project's package.json file. The modules include:

`i18next` and `react-i18next` for internationalization support [`--save`].
`react-router-dom` for client-side routing.
`react-spinners` for loading spinners.
`classnames` for working with CSS class names.
`jwt-decode` for decoding JSON Web Tokens.
`react-table` for creating tables in React.
```shell
$ cd path\to\project-folder
npm install
```

This command will automatically fetch the required dependencies and install them based on the package.json file.

Run the Application: After the installation is complete, you can run your React application with the appropriate npm command (usually `npm start`).

PLEASE CREATE AN Configuration.js FILE in the src WITH YOUR OWN RAPID API KEYS AND FIREBASE KEYS!

# Project Creation
1. Open Command Prompt (as Administrator)
2. [CD] to the location for your project.
3. Create the project with `npx create-react-app (name of project)`.
4. [CD] to the folder of your project.
5. Open it with VS Code using the command `code .`.
6. Install required packages:

- `npm install --save i18next react-i18next`
- `npm install react-router-dom --save`
- `npm install --save react-spinners`
- `npm install classnames`
- `npm install jwt-decode`
- `npm install react-table`

# GitHub Repository:
[Netflix-Wiki-ReactApp Repository](https://github.com/MarvinEscobar/Netflix-Wiki-ReactApp.git)

# Accounts
Create a test account within the application.

# Additional Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production in the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: This is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project, giving you full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can customize them. At this point, you're on your own.

You don't have to ever use `eject`. The feature set provided is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool may become useful when you're ready for complete customization.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting).

### Analyzing the Bundle Size

This section has moved here: [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size).

### Making a Progressive Web App

This section has moved here: [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).

### Advanced Configuration

This section has moved here: [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration).

### Deployment

This section has moved here: [Deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run build` Fails to Minify

This section has moved here: [npm run build fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).


# RapidAPI Documentation for UNOGS API

This documentation provides information on how to use the UNOGS API, accessed via RapidAPI. The API is authorized and paid for by the organization "Marvins Novi" and offers access to various features related to movies and TV shows.

## API Key

To access the UNOGS API via RapidAPI, you need to include the provided API key (referred to as `{APIKEY}` in this documentation) in your requests.

```javascript
const RapidApi = {
	Key: {key},
	Host: "unogs-unogs-v1.p.rapidapi.com",
};
```

## Base URL

The base route for all API endpoints is:

```
https://unogs-unogs-v1.p.rapidapi.com
```

## Authorization

Ensure that you include your API key in the request headers for authorization. Here's an example of how to include it:

```http
X-RapidAPI-Key: {APIKEY}
```

## Endpoints

The UNOGS API via RapidAPI provides various endpoints to retrieve information about movies and TV shows. Below are some of the key endpoints and their descriptions.

### 1. Search for Movies/TV Shows

#### Endpoint:
```
GET /title
```

#### Description:
Search for movies and TV shows based on various criteria such as title, country, type (movie or series), and more.

#### Example Usage:

```http
GET https://unogs-unogs-v1.p.rapidapi.com/title
```

### 2. Get Movie/TV Show Details

#### Endpoint:
```
GET /title_detail
```

#### Description:
Retrieve detailed information about a specific movie or TV show, including cast, genre, director, release year, and more.

#### Example Usage:

```http
GET https://unogs-unogs-v1.p.rapidapi.com/title_detail
```

### 3. Get Available Countries

#### Endpoint:
```
GET /countries
```

#### Description:
Obtain a list of countries where a particular movie or TV show is available for streaming.

#### Example Usage:

```http
GET https://unogs-unogs-v1.p.rapidapi.com/countries
```

### 4. Get Genre List

#### Endpoint:
```
GET /genre
```

#### Description:
Retrieve a list of genres associated with movies and TV shows.

#### Example Usage:

```http
GET https://unogs-unogs-v1.p.rapidapi.com/genre
```
# Firebase Documentation

This documentation provides guidelines for integrating Firebase, including Firestore and Authentication, into your application. Firebase is a comprehensive mobile and web application development platform that offers a wide range of services, including real-time database, cloud functions, authentication, and more.

## Firebase Setup

Before integrating Firebase into your application, you need to set up a Firebase project. If you haven't created a Firebase project, follow these steps:

1. Go to the Firebase Console at [https://console.firebase.google.com/](https://console.firebase.google.com/).

2. Click on "Add Project" and follow the on-screen instructions to set up your project. The project ID, API key, and other required credentials will be generated.

3. Make a note of the following Firebase project credentials:
   - API Key: `{apikey}`
   - Project ID: `{projectid}`
   - App ID: `{appid}`
   - Auth Domain: `{authDomain}`
   - Storage Bucket: `{storageBucket}`
   - Measurement ID: `{measurementId}`

## Firestore Integration

### Firestore Database

Firestore is a NoSQL cloud database provided by Firebase. It allows you to store and sync data in real-time for web, mobile, and server applications.

#### Initialization

To start using Firestore in your application, include the Firebase JavaScript SDK in your HTML file:

```html
<script src="https://www.gstatic.com/firebasejs/{version}/firebase.js"></script>
```

Replace `{version}` with the Firebase SDK version you want to use.

Next, initialize Firestore with the provided Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "{apikey}",
  authDomain: "{authDomain}",
  projectId: "{projectid}",
  storageBucket: "{storageBucket}",
  messagingSenderId: "{messagingSenderId}",
  appId: "{appid}",
  measurementId: "{measurementId}"
};

firebase.initializeApp(firebaseConfig);
```

Now, Firestore is ready to be used in your application.

### Authentication

Firebase Authentication provides secure user authentication and authorization. Here's how to integrate it:

#### Initialization

Include the Firebase Authentication SDK in your HTML file:

```html
<script src="https://www.gstatic.com/firebasejs/{version}/firebase-auth.js"></script>
```

Replace `{version}` with the Firebase SDK version.

Initialize Firebase Authentication with your project credentials:

```javascript
var firebaseConfig = {
  apiKey: "{apikey}",
  authDomain: "{authDomain}",
  projectId: "{projectid}",
  storageBucket: "{storageBucket}",
  messagingSenderId: "{messagingSenderId}",
  appId: "{appid}",
  measurementId: "{measurementId}"
};

firebase.initializeApp(firebaseConfig);
```

### Firestore Security Rules

Firestore security rules are important for controlling access to your database. Make sure to configure appropriate security rules in your Firebase project settings.

## Usage

With Firebase and Firestore configured, you can use the SDK to perform actions like database reads and writes, user authentication, and more.

## Example: Firestore Document Read

```javascript
// Reference to Firestore
var db = firebase.firestore();

// Reference to a document
var docRef = db.collection("users").doc("user-id");

docRef.get().then(function(doc) {
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});
```

## Example: User Authentication

```javascript
// Create an instance of the Firebase auth service
var auth = firebase.auth();

// Sign in with email and password
auth.signInWithEmailAndPassword(email, password)
  .then(function(userCredential) {
    var user = userCredential.user;
    console.log("User is signed in:", user.uid);
  })
  .catch(function(error) {
    console.log("Authentication error:", error);
  });
```

This is a basic introduction to integrating Firebase, Firestore, and Authentication into your application. For more information and detailed documentation, refer to the [Firebase Documentation](https://firebase.google.com/docs).

## Security

Always ensure proper security measures are in place, especially when handling user data and authentication. Firebase provides guidelines and best practices for secure application development, which you should follow.

# GitHub Repository Documentation

This documentation provides an overview of the GitHub repository associated with the "Netflix-Wiki-ReactApp" project. Here, you will find details on how to access the project, contribute, and collaborate with others.

## Repository Overview

- **Repository Name:** Netflix-Wiki-ReactApp
- **GitHub URL:** [https://github.com/MarvinEscobar/Netflix-Wiki-ReactApp.git](https://github.com/MarvinEscobar/Netflix-Wiki-ReactApp.git)

## Accessing the Repository

### Cloning the Repository

To get a local copy of the project, you can clone the repository using Git. Here's how you can do it:

1. Open your terminal or command prompt.

2. Navigate to the directory where you want to clone the repository using the `cd` command:

   ```shell
   cd /path/to/your/desired/directory
   ```

3. Clone the repository using the following Git command:

   ```shell
   git clone https://github.com/MarvinEscobar/Netflix-Wiki-ReactApp.git
   ```

4. After executing the command, the repository will be cloned to your local machine.

### Downloading the ZIP Archive

If you don't want to use Git, you can download the project as a ZIP archive:

1. Visit the GitHub repository's main page: [Netflix-Wiki-ReactApp](https://github.com/MarvinEscobar/Netflix-Wiki-ReactApp.git).

2. Click the "Code" button located on the right side of the page.

3. In the dropdown, select "Download ZIP."

4. The ZIP archive will be downloaded to your computer. Extract its contents to your desired location.

## Project Contribution

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository by clicking the "Fork" button on the top right of the repository's main page.

2. Clone your forked repository to your local machine as described in the "Cloning the Repository" section.

3. Make your changes, add features, or fix bugs within your local repository.

4. Commit your changes using Git, and push them to your forked repository.

5. Create a pull request from your forked repository to the original repository.

6. The project maintainers will review your changes, and if accepted, your code will be merged into the main project.

## Collaborating with Others

Collaboration within the project typically involves issues, discussions, and pull requests. Make sure to follow the project's contribution guidelines and code of conduct.

For more detailed instructions and information about the project, please visit the GitHub repository page: [Netflix-Wiki-ReactApp Repository](https://github.com/MarvinEscobar/Netflix-Wiki-ReactApp.git).

**Note:** This documentation provides basic instructions on accessing and contributing to the GitHub repository. The specific contribution process and guidelines may vary based on the project's requirements and maintainers' instructions.