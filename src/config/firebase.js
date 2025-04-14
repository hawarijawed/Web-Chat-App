// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getFirestore, setDoc, doc} from 'firebase/firestore'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7gaQLxBXRpmqJRgilZxLSdwy_rWUXyEo",
  authDomain: "web-chat-app-98606.firebaseapp.com",
  projectId: "web-chat-app-98606",
  storageBucket: "web-chat-app-98606.firebasestorage.app",
  messagingSenderId: "719436591062",
  appId: "1:719436591062:web:9c666d943d9de8c6d5fe77"
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