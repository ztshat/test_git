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

    // for (const task in docSnap.data()){
    //     console.log(task);
    // }

    // проходиться по кожній властивості документа
    // потім сортує від найменшого до найбільшого
    Object.entries(docSnap.data().tasks)
    .sort(Number(a[0].substring(0,2)) - Number(b[0].substring(0, 2))) 
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
            child.taskTheme = obj[0];
            child.task = task[0];
            path.append(child);
        }); 
        // for (const task in item[1]){
        //     console.log(`${item[0]} ${task}`);
        // }
    });
}



// Знаходить інформацію користувача в базі даних
// Якщо інформації користувача не існує (тобто новий користувач),
// то створити інформацію з шаблону
// checkUser("bruh");
export async function checkUserOnSignIn(uid, userName){
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

