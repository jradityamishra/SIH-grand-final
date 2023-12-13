import React, { useState } from 'react';

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'user' },
    { text: 'Hi there!', sender: 'other' },
    { text: 'How are you?', sender: 'user' },
    { text: 'I am good. Thanks!', sender: 'other' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [groups, setGroups] = useState(['Group 1', 'Group 2', 'Group 3']);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };

  const handleCreateGroup = () => {
    setCreatingGroup(true);
  };

  const handleCancelCreateGroup = () => {
    setCreatingGroup(false);
    setNewGroupName('');
  };

  const handleConfirmCreateGroup = () => {
    if (newGroupName.trim() === '') return;

    setGroups([...groups, newGroupName]);
    setCreatingGroup(false);
    setNewGroupName('');
  };

  const handleDeleteGroup = (index) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(index, 1);
    setGroups(updatedGroups);
  };

  return (
    <div className="flex h-screen bg-gray-100 ml-60"> 
      {/* Side Panel (Groups) ka screen hai*/}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-2xl font-semibold mb-4">Groups</h2>
        <button
          className="w-full py-2 mb-4 bg-green-500 text-white rounded-full hover:bg-green-600"
          onClick={handleCreateGroup}
        >
          + Create Group
        </button>
        <ul>
          {groups.map((group, index) => (
            <li
              key={index}
              className="mb-2 flex items-center justify-between cursor-pointer hover:bg-gray-300 p-2 rounded-md"
            >
              <span>{group}</span>
              <button
                className="p-1 bg-red-400 text-white rounded-full hover:bg-red-600"
                onClick={() => handleDeleteGroup(index)}
              >
                &#x2715;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Chatbox ka screen */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {message.text}
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

      {/* Create group ke lie hai */}
      {creatingGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 w-96">
            <h2 className="text-xl font-semibold mb-4">Create Group</h2>
            <input
              type="text"
              placeholder="Enter group name"
              className="w-full p-2 border rounded-md mb-4"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
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
      )}
    </div>
  );
};

export default Chatbox;
