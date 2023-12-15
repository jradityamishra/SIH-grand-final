import React, { useState } from 'react';
import SidePanel from '../components/chat/SidePanel';
import ChatBoxScreen from '../components/chat/ChatBoxScreen';

const Chatbox = () => {
 
  
  return (
    <>
   <div className="flex h-screen bg-gray-100 ml-60">
    <SidePanel/>
    
    <ChatBoxScreen/>
   </div>
    </>
  );
};

export default Chatbox;
