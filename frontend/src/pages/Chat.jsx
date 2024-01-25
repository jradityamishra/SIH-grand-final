import React, { useState } from 'react';
import SidePanel from '../components/chat/SidePanel';
import ChatBoxScreen from '../components/chat/ChatBoxScreen';
import Layout from '../components/layout/Layout';
const Chatbox = () => {
 
  
  return (
    <>
   <Layout>
   <div className="flex h-screen bg-gray-100 ml-60">
    <SidePanel/>
    
    <ChatBoxScreen/>
   </div>
   </Layout>
    </>
  );
};

export default Chatbox;
