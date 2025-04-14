import React from 'react'
import './RightSideBar.css'
import assests from '../../assets/assets'
import { logout } from '../../config/firebase'

const RightSideBar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img className='profile-img' src={assests.profile_img} alt='profile img' />
        <h3>Richard Sanford <img src={assests.green_dot} alt='greendot' /> </h3>
        <p>Hey There I am Richard Sanford using Chatapp</p>
      </div>
      <hr></hr>
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assests.pic1} alt="" />
          <img src={assests.pic2} alt="" />
          <img src={assests.pic3} alt="" />
          <img src={assests.pic4} alt="" />
          <img src={assests.pic1} alt="" />
          <img src={assests.pic2} alt="" />
          <img src={assests.pic3} alt="" />
          <img src={assests.pic4} alt="" />
          <img src={assests.pic1} alt="" />
          <img src={assests.pic2} alt="" />
          <img src={assests.pic3} alt="" />
          <img src={assests.pic4} alt="" />
          <img src={assests.pic1} alt="" />
          <img src={assests.pic2} alt="" />
          <img src={assests.pic3} alt="" />
          <img src={assests.pic4} alt="" />
          <img src={assests.pic1} alt="" />
        </div>
      </div>

      <button onClick={()=>logout()}>Log Out</button>
    </div>
  )
}

export default RightSideBar
