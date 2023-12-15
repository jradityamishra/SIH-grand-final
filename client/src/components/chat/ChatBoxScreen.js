import React,{useState,useEffect} from 'react'
import {ChatState } from '../../context/ChatProvider'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import ChatLogic from '../../config/ChatLogic'
import {toast } from 'react-toastify'
const ChatBoxScreen = () => {


      const {groupId,setGroup}=ChatState()
      const {user}=useSelector(
            (state) => state.auth
        );
      // console.log("mygroupid:",groupId);
      // USER OF THE PLATFORM
      const myuser=user.user;
      // console.log("data:" ,myuser._id,"groupId:",groupId)
 

    const [messages, setMessages] = useState([
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'other' },
        { text: 'How are you?', sender: 'user' },
        { text: 'I am good. Thanks!', sender: 'other' },
      ]);
    
      const [newMessage, setNewMessage] = useState('');
      const[groupMessage,setGroupMessage]=useState([]);
      // const [groupadminId,setGroupAdminId]=useState();

      // setGroup(groupadminId)

      const handleSendMessage =async () => {
        if (newMessage.trim() === '') return;
        try{
          const response = await axios.post('/api/v1/message/hi',{
            content:newMessage,
            chatId:groupId,
            user_id:myuser._id
          });
          console.log(response.data)
        }catch(error){
         console.error(error);
          toast('Failed to load groups', {
            position: 'top-right',
            status: 'warning',
            autoClose: 5000,
            theme: 'light',
          });
        }
    
        setMessages([...messages, { text: newMessage, sender: 'user' }]);
        setNewMessage('');
      };
    
      
      // FUNCTION CALL FOR ALL MESSAGE

      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/v1/message/${groupId}`);
          setGroupMessage(response.data)
          response.data.map((d)=>{
             setGroup(d.chat.groupAdmin)
           console.log(d.chat.groupAdmin)
          })
        } catch (error) {
          console.error(error);
          toast('Failed to load groups', {
            position: 'top-right',
            status: 'warning',
            autoClose: 5000,
            theme: 'light',
          });
        }
      };

      useEffect(() => {
        fetchData();
       // Call the async function
       
      }, [myuser,groupId,newMessage]);
      
  return (
    <>
       <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {groupMessage.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.sender._id === myuser._id ? 'text-right' : 'text-left'}`}
            >
              <div className='mb-1'>
                <span  className="text-gray-900 text-sm text-bold font-bold">{message.name}</span>
 
              </div>
              
              
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.sender._id === myuser._id  ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                <span className='inline-block'>{message.sender.name}</span>
                {message.content}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center p-4 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 mr-4 border rounded-md focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
             onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>

    {/* creating group */}
      {/* Create group ke lie hai */}
     
</>
  )
}

export default ChatBoxScreen