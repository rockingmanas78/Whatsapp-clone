// eslint-disable-next-line
import firebase from "firebase/app";
import "firebase/firestore";
require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyC_prgnoqJqtCbeWgDy_b9cpYj--ODuleo",
    authDomain: "whatsapp-clone-b4eea.firebaseapp.com",
    projectId: "whatsapp-clone-b4eea",
    storageBucket: "whatsapp-clone-b4eea.appspot.com",
    messagingSenderId: "444552736468",
    appId: "1:444552736468:web:bd18c0634d543b1e235541",
    measurementId: "G-Q5KFXF4LRH"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth, provider};
  export default db;