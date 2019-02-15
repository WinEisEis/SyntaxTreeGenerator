import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAx0koOO40nw2aW5Au-Ttffruu-gP-OCqA",
    authDomain: "treebank-8d20f.firebaseapp.com",
    databaseURL: "https://treebank-8d20f.firebaseio.com",
    projectId: "treebank-8d20f",
    storageBucket: "",
    messagingSenderId: "337266707029"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
