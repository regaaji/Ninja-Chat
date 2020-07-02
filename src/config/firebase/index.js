import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyC-hzrwPZmFd-NSpCgreSu_C3EG8T9BY2k",
    authDomain: "ninja-chat-3af34.firebaseapp.com",
    databaseURL: "https://ninja-chat-3af34.firebaseio.com",
    projectId: "ninja-chat-3af34",
    storageBucket: "ninja-chat-3af34.appspot.com",
    messagingSenderId: "744491213016",
    appId: "1:744491213016:web:bc83bf324e184c821077ad",
    measurementId: "G-P20YR0J9DJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;