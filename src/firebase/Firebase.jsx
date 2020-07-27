import firebase from 'firebase/app'
import "firebase/auth";
import database from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const db = firebaseApp.database();
// export default firebaseApp

firebase.initializeApp(firebaseConfig);
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerGithub = new firebase.auth.GithubAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const db = firebase.database();
export default firebase;
// export default firebase

