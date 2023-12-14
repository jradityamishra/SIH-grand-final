import React, { useState } from "react";
import Layout from "../../components/layout/Layout";

const Mentorship = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <Layout>
      <h2 className="text-center text-3xl mb-8 font-semibold">Inbox</h2>
      <div className="flex h-80">
        <div className="w-1/3 p-4 pl-8 bg-gray-100">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Chat with
          </h2>
          <ul className="cursor-pointer">
            <li onClick={() => handleUserClick("boy1")}>boy1</li>
            <li onClick={() => handleUserClick("girl2")}>girl2</li>
            <li onClick={() => handleUserClick("boy2")}>boy2</li>
            <li onClick={() => handleUserClick("girl2")}>girl2</li>
          </ul>
        </div>
        <div className="w-2/3 p-4 bg-gray-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            {selectedUser}
          </h2>
          <div className="flex flex-col h-full p-3 bg-gray-200 rounded-md">
            <div className="flex-grow overflow-auto">
              <div className="flex flex-col-reverse">
                {/* Messages for {selectedUser} will go here */}
              </div>
            </div>
            <div className="mt-4">
              <form className="flex">
                <input
                  className="w-full px-4 py-2 mr-3 text-gray-800 bg-white border rounded-lg focus:outline-none"
                  placeholder="Type your message"
                />
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mentorship;
