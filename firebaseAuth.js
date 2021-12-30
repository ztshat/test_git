// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"
import { doc, getDoc,addDoc , updateDoc, getFirestore, query, getDocs, where, collection, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"

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
const db = getFirestore(app);
// const analytics = getAnalytics(app);


const auth = getAuth(app);
// google pop up
// google pop up
// google pop up
const provider = new GoogleAuthProvider();
// sets pop up language
// auth.useDeviceLanguage();

// console.log(auth);

const popupGoogle = async function(){

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        checkUser(user.uid, user.displayName); 

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("clicked the X");
        const btn = document.getElementById("signIn&Out");
        btn.addEventListener("click", popupGoogle, {once: true});
    });
};

// Знаходить інформацію користувача в базі даних
// Якщо інформації користувача не існує (тобто новий користувач),
// то створити інформацію з шаблону
// checkUser("bruh");
async function checkUser(uid, userName){
    const docRef = doc(db, "main", uid);
    const theDoc = await getDoc(docRef);
    if(!theDoc.data()){
        console.log("bruh")
        createUser(uid, userName);
    }else{
        readUser(theDoc.data(), uid);
        console.log("double bruh");
    }
};
// Створює документ юзера
async function createUser(uid, userName){
    const theDocRef = doc(db, "main", "template");
    const docRef = doc(db, "main", `${uid}`);
    localStorage.setItem("userDataPath", `${uid}`)
    const docSnap = await getDoc(theDocRef);
    let uDoc = docSnap.data();
    // додає шаблону айді
    uDoc.userName = `${userName}`;
    uDoc.uid = `${uid}`;
    await setDoc(docRef, uDoc);
};

async function readUser(doc, uid){
    // console.log(doc);
    localStorage.setItem("userDataPath", `${uid}`);
    const box = document.getElementById("box");
    const obj1 = "div";
    // tasksLoad(box, obj1);
};

async function tasksLoad(path, tag, uid){
    const docRef = doc(db, "main", uid);
    const docSnap = await getDoc(docRef);

    // for (const task in docSnap.data()){
    //     console.log(task);
    // }

    // проходиться по кожній властивості документа
    // потім сортує від найменшого до найбільшого
    Object.entries(docSnap.data().tasks)
    .sort(sortTasks) 
    .forEach(obj => {
        // із-за того що MAP об'єкт має як назву так і властивості,
        // функція вище повертає масив (властивостей документу)
        // масивів (назви та властивостей MAP об'єкту )
        // в нашому випадку назва MAP - це загальна тема завдань (01_Form),
        // а властивості MAP - це  власне завдання (00, 01, 02, 03)
        Object.entries(obj[1]).sort((a, b) => 
            Number(a[0]) - Number(b[0])
        )
        .forEach(task => {
            // вставляє данні у потрібний об'єкту в потрібні теги
            // console.log(`${item[0]} ${task[0]}`);
            const child = document.createElement(tag);
            child.innerText = `${obj[0]}_${task[0]}: ${task[1]}%`;
            child.value =`${obj[0]}>>${task[0]}`;
            path.append(child);
        }); 
        // for (const task in item[1]){
        //     console.log(`${item[0]} ${task}`);
        // }
    });
}
function sortTasks(a, b){
    return Number(a[0].substring(0,2)) - Number(b[0].substring(0, 2));
}




const signOutVar = async function(){
    signOut(auth).then(() => {
        // future popUp here
      }).catch((error) => {
        // future error popUp here
      });
};


// checks user
// checks user
// checks user
onAuthStateChanged(auth, (user) => {
    const btn = document.getElementById("signIn&Out");
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        btn.innerText = "SIGN OUT"
        console.log(uid, "user signed in");
        btn.addEventListener("click", signOutVar, {once: true});
        
    } else {
        btn.innerText = "SIGN IN"
        btn.addEventListener("click", popupGoogle, {once: true});
        console.log("user is not signed in")
    }
});

// відправка результатів
const sendBtn = document.getElementById("submit");
const range = document.getElementById("range");
const taskSelect = document.getElementById("task");
sendBtn.addEventListener("click", sendResult);

async function sendResult(){
    const selOpt = taskSelect.options[taskSelect.selectedIndex];
    // console.log(selOpt.task);
    const docName = localStorage.getItem("userDataPath");
    // console.log(docName)
    const theDocRef = doc(db, "main", `${docName}`);
    const theDoc = await getDoc(doc(db, "main", `${docName}`));
    const theDocTemplate = theDoc.data();
    // const tasksIn = taskSelect.value.substring(0,)
    // console.log(`${taskSelect.task}`, `${taskSelect.taskTheme}`, range.value)
    theDocTemplate.tasks[`${selOpt.taskTheme}`][`${selOpt.task}`] = Number(range.value);
    await updateDoc(theDocRef, theDocTemplate);
};

// відображення результатів

const btn = document.getElementById("showBtn");
btn.addEventListener("click", showResult);

function showResult(){
    const uid = localStorage.getItem("userDataPath");
    const box = document.getElementById("box");
    const obj1 = "div";
    tasksLoad(box, obj1, uid);
}