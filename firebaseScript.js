// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6s_8U18Lo6t6OauWP_kpf0y0bpFThCrk",
  authDomain: "csvalidation-e182e.firebaseapp.com",
  projectId: "csvalidation-e182e",
  storageBucket: "csvalidation-e182e.appspot.com",
  messagingSenderId: "351738632285",
  appId: "1:351738632285:web:ae96a0a6d490cd3e5f15b4",
  measurementId: "G-973D5PX7XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
    console.log("work2")

  } else {
    console.log("work")
    // User is signed out
    // ...
  }
});