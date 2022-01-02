import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { doc, getDoc, updateDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyC6s_8U18Lo6t6OauWP_kpf0y0bpFThCrk",
    authDomain: "csvalidation-e182e.firebaseapp.com",
    projectId: "csvalidation-e182e",
    storageBucket: "csvalidation-e182e.appspot.com",
    messagingSenderId: "351738632285",
    appId: "1:351738632285:web:ae96a0a6d490cd3e5f15b4",
    measurementId: "G-973D5PX7XX"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function sendResult(taskTheme, task, result){
    const range = document.getElementById("range");
    const taskSelect = document.getElementById("task");
    const selOpt = taskSelect.options[taskSelect.selectedIndex];
    // console.log(selOpt.task);
    const docName = localStorage.getItem("userDataPath");
    // console.log(docName)
    const theDocRef = doc(db, "main", `${docName}`);
    const theDoc = await getDoc(doc(db, "main", `${docName}`));
    const theDocTemplate = theDoc.data();
    // const tasksIn = taskSelect.value.substring(0,)
    // console.log(`${taskSelect.task}`, `${taskSelect.taskTheme}`, range.value)
    theDocTemplate.tasks[`${taskTheme}`][`${task}`] = Number(result);
    await updateDoc(theDocRef, theDocTemplate);
};
export async function formSubmit(){
    const taskSelect = document.getElementById("task");
    const selOpt = taskSelect.options[taskSelect.selectedIndex];
    const range = document.getElementById("range");

    sendResult(selOpt.taskTheme, selOpt.task, range);
}