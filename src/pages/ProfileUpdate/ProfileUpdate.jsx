import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase'
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);  // Allow null instead of false
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  
  const {setUserData} = useContext(AppContext);
  // Profile update function to update name, bio, and image (if available)
  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      // Ensure the user has entered a name and bio before submitting
      if (!name || !bio) {
        toast.error("Please fill out all required fields.");
        return;
      }

      const docRef = doc(db, 'users', uid);

      // If an image is selected, upload it to Firebase storage and update the Firestore document
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name
        });
      } else {
        // If no image, just update name and bio
        await updateDoc(docRef, {
          bio: bio,
          name: name
        });
      }

      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate('/chat');
      // Show success toast after updating
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "An error occurred while updating your profile.");
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {  // Check if document exists before accessing data
          const userData = docSnap.data();
          setName(userData.name || ""); // Set default value if data is missing
          setBio(userData.bio || "");   // Set default value if data is missing
          setPrevImage(userData.avatar || ""); // Set default image if not found
        }
      } else {
        navigate('/');  // Navigate to home page if no user is authenticated
      }
    });
  }, [navigate]); // Add navigate to the dependency array

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input 
              onChange={(e) => setImage(e.target.files[0])} 
              type="file" 
              id='avatar' 
              accept='.png, .jpeg, .jpg' 
              hidden 
            />
            <img 
              src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon} 
              alt="avatar" 
            />
            Upload profile image 
          </label>
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type="text" 
            placeholder='Your name' 
            required 
          />
          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio} 
            placeholder='Write your profile bio'  
            required 
          />
          <button type="submit">Save</button>
        </form>
        <img 
          className='profile-pic' 
          src={image ? URL.createObjectURL(image) : prevImage || assets.logo_icon} 
          alt="" 
        />
      </div>
    </div> 
  )
}

export default ProfileUpdate;
