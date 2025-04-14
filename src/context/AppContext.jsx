import { doc,setDoc , getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useDebugValue, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

//Context provider function
const AppContextProvider = (props) =>{
    
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);
    const navigate = useNavigate();
    const loadUserData = async (uid) =>{
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);
            //console.log(userSnap);
            const userData = userSnap.data();
            setUserData(userData);
            if(userData.name){
                navigate('/chat');
            }
            else{
                navigate('/profile');
            }

            await updateDoc(userRef,{
                lastSeen:Date.now()
            });
            setInterval(async ()=>{
                if(auth.chatUser){
                    await updateDoc(userRef,{
                        lastSeen:Date.now()
                    });
                }
            }, 6000)
        } catch (error) {
            
        }
    }

    // useEffect(()=>{
    //     if (userData) {
    //         const charRef = doc(db, 'chats', userData.id);
    //         const unSub = onSnapshot(charRef, async (res) =>{
    //             const chatItems = res.data().chatData;
    //             //console.log(chatItems);
                
    //             const tempData = [];
    //             for(let item of chatItems){
    //                 const userRef = doc(db, 'users', item.rId);
    //                 const userSnap = await getDoc(userRef);
    //                 const userData = userSnap.data();
    //                 tempData.push({...item, userData});
    //             }

    //             setChatData(tempData.sort((a, b)=>b.updatedAt - a.updatedAt));

    //         })

    //         return() => {
    //             unSub();
    //         }
    //     }
    // },[userData])
    //Shared value with all components
    useEffect(() => {
        if (userData) {
          const charRef = doc(db, 'chats', userData.id);
      
          const unSub = onSnapshot(charRef, async (res) => {
            // Check if the document exists
            if (!res.exists()) {
              console.warn(`Chats document not found for user: ${userData.id}`);
              
              // Optional: Create empty chat doc to avoid future issues
              await setDoc(charRef, { chatsData: [] });
              setChatData([]);
              return;
            }
      
            const chatItems = res.data().chatsData || [];
      
            const tempData = [];
            for (let item of chatItems) {
              try {
                const userRef = doc(db, 'users', item.rId);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.exists() ? userSnap.data() : null;
      
                if (userData) {
                  tempData.push({ ...item, userData });
                }
              } catch (err) {
                console.error(`Failed to fetch user ${item.rId}:`, err);
              }
            }
      
            // Sort by updatedAt (descending) before setting state
            setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
          });
      
          return () => {
            unSub();
          };
        }
      }, [userData]);
      
    
    const value = {
        userData,setUserData,
        chatData, setChatData,
        loadUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;