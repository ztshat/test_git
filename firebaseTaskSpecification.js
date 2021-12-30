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

const select0 = document.getElementById("task");
const obj = "option";
const box = document.getElementById("box");
const obj1 = "div";
// tasksLoad(box, obj1);
tasksLoad(select0, obj);
async function tasksLoad(path, tag){
    const docRef = doc(db, "main", "template");
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
            child.innerText = `${obj[0]}_${task[0]}: ${task[1]}`;
            child.taskTheme = obj[0];
            child.task = task[0];
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


