import React, { useContext, useState } from 'react'
import './LeftSideBar.css'
import assets from '../../assets/assets'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { arrayUnion, collection, doc, getDoc, getDocs, Query, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'
const LeftSideBar = () => {

  const navigate = useNavigate();
  const { userData, chatData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const inputHandler = async (e) => {
    // try {
    //   const input = e.target.value.trim().toLowerCase();
    //   //console.log(input);

    //   const userRef = collection(db,'users');
    //   const q = query(userRef, where("username", ">=", input),
    //   where("username", "<=", input + "\uf8ff"));
    //   const querySnap = await getDoc(q);
    //   if(!querySnap.empty()){
    //     console.log(querySnap.docs[0].data());

    //   }
    //   else{
    //     console.log("User Not found");

    //   }
    //   // const userRef = collection(db, "users");
    //   // const querySnap = await getDocs(userRef);
    //   // console.log("User docs:", querySnap.docs.map(doc => doc.data()));
    // } catch (error) {
    //   toast.error(error);
    // }


    try {
      const input = e.target.value.trim().toLowerCase();
      if (input.length < 2) return; // wait for 2+ characters to reduce queries
      if (input.length >= 2) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(
          userRef,
          where("username", ">=", input),
          where("username", "<=", input + "\uf8ff")
        );

        const querySnap = await getDocs(q);

        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          const results = querySnap.docs.map(doc => doc.data());
          let userExists = false;

          chatData.map((user) => {
            console.log("user: ", user);
            if (user.rId === querySnap.docs[0].data().id) {
              userExists = true;
              toast.success("User already exist");
            }
          })

          if (!userExists) {
            setUser(querySnap.docs[0].data());
            toast.error("New user is set");
          }

        } else {
          setUser(null);
        }
      }
      else {
        setShowSearch(false);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    };
  }

  const addChat = async () => {
    const chatAlreadyExists = chatData.some(chat => chat.rId === user.id);

    if (chatAlreadyExists) {
      toast.info("Chat already exists — not creating a new one.");
      return;
    }
    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessageRef = doc(messagesRef);

      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: []
      })

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true
        })
      })

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true
        })
      })

      toast.success("User added successfully!!!")
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} />
          <div className="menu">
            <img src={assets.menu_icon} />
            <div className="sub-menu">
              <p onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr />
              <p>Log out</p>
            </div>
          </div>
        </div>

        <div className="ls-search">
          <img src={assets.search_icon} />
          <input onChange={inputHandler} type="text" placeholder='search' className="text" />
        </div>
      </div>

      <div className="ls-list">
        {
          showSearch && user
            ? <div onClick={addChat} className='friends add-user'>
              <img src={assets.profile_img} alt='user avatar' />
              <p>{user.name}</p>
            </div>
            : Array(12).fill("").map((item, index) => (
              <div key={index} className="friends">
                <img src={assets.profile_img} />
                <div>
                  <p>Richard Sanford</p>
                  <span>Hello, How are you</span>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default LeftSideBar
