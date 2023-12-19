import React, { createContext, useContext, useEffect, useState } from "react";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [groupId, setGroupId] = useState();
  const [notification, setNotification] = useState([]);
  const [group, setGroup] = useState();

  

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   // setUser(userInfo);

   
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <ChatContext.Provider
      value={{
        groupId, setGroupId,
        group, setGroup,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
       
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;