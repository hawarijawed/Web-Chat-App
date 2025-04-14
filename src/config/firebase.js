// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getFirestore, setDoc, doc} from 'firebase/firestore'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        //Storing user data in firestore database
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email:email,
            name:"",
            avatar:"",
            bio:"Hello there, I am currently using Chatapp",
            lastSeen:Date.now()
        })
        
        await setDoc(doc(db, "chats", user.uid),{
            chatData:[],
        })
        
        toast.success("Account Created Successfully");
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) =>{
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        toast.success("Logged in successfully");
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async ()=>{
   
    try {
        await signOut(auth);
        toast.success("Logged out successfully")
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}
export {signup,login,logout, auth, db};