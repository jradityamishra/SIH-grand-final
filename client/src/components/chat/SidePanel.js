import React,{useState,useEffect} from 'react'
import {toast }from 'react-toastify'
import { ChatState } from '../../context/ChatProvider';
import { useSelector } from 'react-redux';
import axios from 'axios'
// import ChatLogic from '../../config/ChatLogic'

const SidePanel = () => {

// -------------------USER OF THE SYSTEM------------------

          const {user}=useSelector(
            (state) => state.auth
          )
            const userStudent=user.user;
            console.log("id:",userStudent._id);


    
// -------------------STATE MANAGEMENT------------------
           
const [id, setId] = useState();
      const [loading, setLoading] = useState(false);
      const [selectedUsers, setSelectedUsers] = useState([]);
      const [groups, setGroups] = useState([]);
      const [creatingGroup, setCreatingGroup] = useState(false);
      const [newGroupName, setNewGroupName] = useState('');
       const [search, setSearch] = useState('');
       const [searchResult, setSearchResult] = useState([]);
       const [chat, setChat] = useState([]);
       const [isComponentOpen, setIsComponentOpen] = useState(false);
       const [selectedGroupId, setSelectedGroupId] = useState(null);
     


      

  // -------------------SET GROUPID IN THE CONTEXT------------------

       const {setGroupId}=ChatState();

       
      const handleSpanClick = (groupId) => {
        setSelectedGroupId(groupId);
        setGroupId(groupId)
        setIsComponentOpen(true);
      };

  // -------------------SEARCH USER FOR MAKING GROUP------------------

      const setNewgroupUser=async(query)=>{
        setSearch(query);
        if(!query){
            return;
        }
        try{
            setLoading(true)
            const {data}=await axios.get(`/api/v1/auth/getuser?search=${search}`,{id:userStudent._id});
            console.log(data);
            setLoading(false);
            setSearchResult(data);

        }catch(error){
            toast(error,{
                duration: 4000,
                position: 'top-right',

            })
        }
      }

  // -------------------ADD USER IN THE GROUP------------------

      const handleGroup=(userToAdd)=>{
        if(selectedUsers.includes(userToAdd)){
          toast('user already included',{
            position:'top-right',
            status:'warning',
            autoClose:'5000',
            theme:'light'
          })
          return;
        }
        setSelectedUsers([...selectedUsers,userToAdd]);
      }

  // -------------------DELETE GROUP------------------


      const handleDelete=(u)=>{
       
       setSelectedUsers( selectedUsers.filter((sel)=>sel._id !== u._id))
      }

      const handleConfirmCreateGroup = async() => {
       if(!newGroupName|| !selectedUsers){
        toast('plese fill all the toast',{
          position:'top-right',
          status:'warning',
          autoClose:'5000',
          theme:'light'
        })
        return;
       }
       selectedUsers.push(userStudent);
       console.log("selectuser:",selectedUsers)
       try{
        const {data}=await axios.post(`/api/v1/chat/group`,
       { name:newGroupName,
        users:JSON.stringify(selectedUsers.map((u)=>u._id))});
        console.log(data);
        setGroups((prevChat) => [data, ...prevChat]);
        // setGroups.push(data);
        handleCancelCreateGroup();
        toast('new group created',{
          position:'top-right',
          status:'warning',
          autoClose:'5000',
          theme:'light'
        })
       }catch(error){
        toast('Failed to create group',{
          position:'top-right',
          status:'warning',
          autoClose:'5000',
          theme:'light'
        })
       }
      };
        

    
    
      const handleCreateGroup = () => {
        setCreatingGroup(true);
      };
    
      const handleCancelCreateGroup = () => {
        setCreatingGroup(false);
        setNewGroupName('');
      };
    
      
    
      const handleDeleteGroup =async (index) => {
      alert("sure are you delete this  group");
      try{
        const response = await axios.delete(`/api/v1/chat/delete/${index._id}`);
        console.error(response);
        
        setGroups((prevGroups) => prevGroups.filter((group) => group._id !== index._id));
            toast('group is deleted', {
              position: 'top-right',
              status: 'warning',
              autoClose: 5000,
              theme: 'light',
            });
      }catch(error){
        console.error(error);
        toast('Failed to delete the group', {
          position: 'top-right',
          status: 'warning',
          autoClose: 5000,
          theme: 'light',
        });
      }
      };


  // -------------------FETCH------------------
  
      const fetchData = async () => {
             if(!userStudent){
          console.log("not get user");
        }
        try {
          if(userStudent._id){
          const response = await axios.get(`http://localhost:8000/api/v1/chat/getGroup/${userStudent._id}`);
          console.log("response", response.data.data);
          response.data.data.map((g)=>{
            setId(g.groupAdmin._id)
            setGroupId(g._id)
            console.log("data:",g.groupAdmin._id);
            console.log("myid:",g._id);
          })
         
      setGroups(response.data.data);
        }
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
      }, [userStudent._id]);
     
  return (
    <>
    {/* <div className="flex h-screen bg-gray-100 ml-60"> */}
    
       <div className="w-1/4 bg-gray-200 p-4">
      
        <h2 className="text-2xl font-semibold mb-4">Groups</h2>
        <button
          className="w-full py-2 mb-4 bg-green-500 text-white rounded-full hover:bg-green-600"
          onClick={handleCreateGroup}
        >
          + Create Group
        </button>
        <ul>
          {groups.map((g, index) => (
            <li
              key={g._id}
              className="mb-2 flex items-center justify-between cursor-pointer hover:bg-gray-300 p-2 rounded-md"
            >
               {/* onClick={() => handleSpanClick(group._id)} */}
               <span onClick={() => handleSpanClick(g._id)}>{g.chatName}</span>
             { id===userStudent._id  ? <button
                className="p-1 bg-red-400 text-white rounded-full hover:bg-red-600"
                onClick={() => handleDeleteGroup(g)}
              > 
                &#x2715;
              </button>: ''}
            </li>
          ))}  
        </ul>
      </div>


      {creatingGroup ? (   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 w-96">
            <h2 className="text-xl font-semibold mb-4">Create Group</h2>
            <input
              type="text"
              placeholder="Enter group name"
              className="w-full p-2 border rounded-md mb-4"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
             <h2 className="text-xl font-semibold mb-4">Add Users</h2>
            <input
              type="text"
              placeholder="Enter group name"
              className="w-full p-2 border rounded-md mb-4"
              
              onChange={(e) => setNewgroupUser(e.target.value)}
            />
                    {/* selected user */}
                    {
                      // selectedUsers.map((u)=>(
                      //   <span  id="badge-dismiss-dark" class="inline-flex items-center my-1 mx-1 px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                      //   {u.name} 
                      //   <button type="button" onClick={()=>handleDelete(u)} class="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                      //   <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      //   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      //   </svg>
                      //   <span class="sr-only" >Remove badge</span>
                      //   </button>
                      //   </span>
                       
                      // ))
                    }
                    {
                        loading?(<div>Loading....</div>):(
                            searchResult?.map((user)=>
                            <div class="bg-indigo-900 text-center py-4 lg:px-4 cursor-pointer"
                            onClick={()=>handleGroup(user)}>
                              <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                      
                                <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNq-fhMeQRIAFfcfgPFaQDO8yTQ_SOW1-6raA_0HgiiKDJTV0TkDiojPT98h40g8T4FAk&usqp=CAU" alt="Bordered avatar" />
                      
                                <div class='flex flex-col ml-2'>
                                  <span class="font-semibold mr-2 text-left flex-auto mt-1 mb-1">{user.name}</span>
                                  <span class="font-semibold mr-2 text-center flex-auto">{user.studentClass}</span>
                                </div>
                      
                              </div>
                            </div>
                           )
                        )
                    }
                    {/* render search user */} 



            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mr-2"
                onClick={handleConfirmCreateGroup}
              >
                Create
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                onClick={handleCancelCreateGroup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ):''}

{/* {isComponentOpen && <ChatBoxScreen groupId={selectedGroupId} />} */}
    {/* </div> */}
    </>
  )
}

export default SidePanel