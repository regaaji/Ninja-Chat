<h1 align="center">Ninja Chat App</h1>
<p align="center">
  <img src="ReactNativeMaps/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png" width="200">
</p>
<p align="center">
  Built with React Native.
</p>


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage-for-development)
- [Release APK](#release-apk)
- [Screenshots](#screenshots)

## Introduction
<b>Ninja Chat</b> makes it easy to find friends around and start chatting anytime with realtime location making it always connected with friends all over the world


## Features

* Realtime chat using firebase
* Show location of your friends
* Show list friend
* Show Profile

## Requirements
* [`yarn`](https://yarnpkg.com/getting-started/install)
* [`react-native`](https://facebook.github.io/react-native/docs/getting-started)
* `Google maps API Key` you can get it [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
* `Config realtime database firebase for WEB` you can get it [here](https://firebase.google.com/)
#### Example config
```
const firebaseConfig = {
  apiKey: "YOUR_apiKey",
  authDomain: "YOUR_authDomain",
  databaseURL: "YOUR_databaseURL",
  projectId: "YOUR_projectId",
  storageBucket: "YOUR_storageBucket",
  messagingSenderId: "YOUR_messagingSenderId",
  appId: "YOUR_appId",
  measurementId: "YOUR_measurementId"
};
```
## Usage for development
1. Open your terminal or command prompt
2. Type `git clone https://github.com/regaaji/Ninja-Chat.git`
3. Open the folder and type `yarn install` for install dependencies
4. Add your realtime database config to `./src/config/firebase/index.js`
5. Add your goole maps API Key on `AndroidManifest.xml`
##### Example
  ```
  <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_API_KEY"/>
  ```
6. Type `yarn run-android` for run this app
7. done

## Release APK
<a href="https://drive.google.com/file/d/1Wu8WG57CY2Ia8_VjxKSrLbaMx5FzF4T6/view?usp=sharing">
  <img src="https://img.shields.io/badge/Download%20on%20the-Google%20Drive-blue.svg?style=popout&logo=google-drive"/>
</a>


## Screenshot 


<kbd>
<img src="ReactNativeMaps/screenshot/splash.jpg" width="200">
</kbd>

<kbd>
<img src="ReactNativeMaps/screenshot/login.jpg" width="200">
</kbd>

<kbd>
<img src="ReactNativeMaps/screenshot/map.jpg" width="200">
</kbd>

<kbd>
<img src="ReactNativeMaps/screenshot/chat.jpg" width="200">
</kbd>
