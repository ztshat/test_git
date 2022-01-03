// firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { doc, getDoc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"

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

export async function tasksLoad(path, tag, uid){
    const docRef = doc(db, "main", uid);
    const docSnap = await getDoc(docRef);

    // проходиться по кожній властивості документа
    // потім сортує від найменшого до найбільшого
    console.log(docSnap.data())
    Object.entries(docSnap.data().tasks)
    .sort((a,b) => Number(a[0].substring(0,2)) - Number(b[0].substring(0, 2))) 
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
            const child = document.createElement(tag);
            child.innerText = `${obj[0]}_${task[0]}: ${task[1]}%`;
            child.taskTheme = obj[0];
            child.task = task[0];
            path.append(child);
        }); 
    });
};



// Знаходить інформацію користувача в базі даних
// Якщо інформації користувача не існує (тобто новий користувач),
// то створити інформацію з шаблону
export async function checkUserOnSignIn(uid, userName){
    const docRef = doc(db, "main", uid);
    const theDoc = await getDoc(docRef);

    if(!theDoc.data()){
        console.log("bruh")
        createUser(uid, userName);
    }else{
        checkUserVersion(theDoc, null, uid, true);
        console.log("double bruh");
    }
};
// Створює документ юзера
async function createUser(uid, userName){
    const theDocRef = doc(db, "main", "template");
    const docRef = doc(db, "main", `${uid}`);

    // зберігає посилання на інформацію користувача у локальному сховищі
    localStorage.setItem("userDataPath", `${uid}`);
    const docSnap = await getDoc(theDocRef);

    // зберігає інформацію користувача у локальне сховище
    localStorage.setItem("userData", `${JSON.stringify(docSnap.data())}`);
    let uDoc = docSnap.data();

    // додає шаблону айді
    uDoc.userName = `${userName}`;
    uDoc.uid = `${uid}`;

    // створює інформацію користувача
    await setDoc(docRef, uDoc);
};

export async function checkUserVersion(userDoc, templateDoc, uid, saveData){
    // userDoc - дані користувача на сервері, якщо = null, або undefined,
    // тоді виконується запит для отримання даних

    // templateDoc - шаблон даних користувачів, якщо = null, або undefined,
    // тоді виконується запит для отримання даних

    // uid - айді користувача
    // saveData = boolean
    // якщо true, тоді синхронізує дані у локальному сховищі

    if(!userDoc){
        const userDocRef = doc(db, "main", `${uid}`);
        userDoc = await getDoc(userDocRef);
        // із-за того, що створення 
        if(!userDoc){
            return;
        }; 
    }
    if(!templateDoc){
        const templateRef = doc(db, "main", "template");
        templateDoc = await getDoc(templateRef);   
    }
    console.log(userDoc.data(), templateDoc.data());
    if(templateDoc.data().version !== userDoc.data().version){
        // синхронізує дані користувача
        const mergeFrom = templateDoc.data();
        const mergeIn = doc(db, "main", `${uid}`);
        await setDoc(mergeIn, mergeFrom, { merge: true });

        // синхронізує локальні дані з глобальними 
        const localData = JSON.parse(localStorage.getItem("userData"));
        const newLocalData = {...mergeFrom, ...localData}
        localStorage.setItem("userData", `${JSON.stringify(newLocalData)}`);
    
    }else if(templateDoc.data().version == userDoc.data().version && saveData){
        // saves data
        localStorage.setItem("userDataPath", `${uid}`);
        localStorage.setItem("userData", `${JSON.stringify(userDoc.data())}`);
    }
}
