// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCciAYK7sqGljRnjKljvgeXCMJzv85G1U",
    authDomain: "actividad1-86ad4.firebaseapp.com",
    projectId: "actividad1-86ad4",
    storageBucket: "actividad1-86ad4.firebasestorage.app",
    messagingSenderId: "439746215965",
    appId: "1:439746215965:web:13ec021871e515b5a486f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export const save = (clas) => {
    addDoc(collection(db, 'Clasificacion'), clas)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'Clasificacion'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'Clasificacion', id))
}

export const getDocumento = (id) => getDoc(doc(db, 'Clasificacion', id))

export const update = (id, clasificacion) =>{
    updateDoc(doc(db,'Clasificacion',id),clasificacion)
}