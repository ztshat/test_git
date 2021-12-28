import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { doc, getDoc, getFirestore, query, getDocs, where, collection, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"
// config
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
const db = getFirestore(app);




// code
// code
// code


// const docRef = doc(db, "main", "tasks");
// const docSnap = await getDoc(docRef);

// const q = query(collection(db, "main"), where("01_Form", "==", {'00' : 0,'01' : 0,'02' : 0, '03' : 0}));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doced) => {
//   // doc.data() is never undefined for query doc snapshots
// });


// if (docSnap.exists()) {
//   await setDoc(doc(db, "main", "leTask"), docSnap.data());

// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
export function happy(){
  console.log("happy")
}

