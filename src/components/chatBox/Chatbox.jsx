import React from 'react'
import './Chatbox.css';
import assests from '../../assets/assets'
const Chatbox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assests.profile_img} alt='profile image'/>
        <p>Richar Sanford <img className='dot' src={assests.green_dot} alt='online indicator' /></p>
        <img src={assests.help_icon} className='help' alt='help' />
      </div>

      {/* Middle Part */}
      <div className="chat-message">
        <div className="s-msg">
          <p className='msg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facilis a doloribus molestiae?.</p>
          <div>
            <img src={assests.profile_img} alt='profile img' />
            <p>2:30pm</p>
          </div>
        </div>

        <div className="s-msg">
          <img className='msg-img' src={assests.pic1} alt='img send' />
          <div>
            <img src={assests.profile_img} alt='profile img' />
            <p>2:30pm</p>
          </div>
        </div>

        <div className="r-msg">
          <p className='msg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facilis a doloribus molestiae?.</p>
          <div>
            <img src={assests.profile_img} alt='profile img' />
            <p>2:30pm</p>
          </div>
        </div>
      </div>

      {/*   Bottom part */}
      <div className="chat-input">
        <input type="text"  placeholder='Send a message' />
        <input type="file" name="image" id="image" accept='image/png,image/jpeg' hidden/>
        <label htmlFor='image'>
          <img src={assests.gallery_icon} alt='gallery icon'/>
        </label>
        <img src={assests.send_button} alt='send image'/>
      </div>
    </div>
  )
}

export default Chatbox
