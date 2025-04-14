import React from 'react'
import './Chat.css';
import LeftSideBar from '../../components/leftSideBar/LeftSideBar';
import Chatbox from '../../components/chatBox/Chatbox';
import RightSideBar from '../../components/rightSideBar/RightSideBar';
const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSideBar />
        <Chatbox />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Chat
