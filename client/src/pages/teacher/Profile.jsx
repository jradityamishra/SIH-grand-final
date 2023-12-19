import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';



const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    role: 'Web Developer',
    email: 'john.doe@example.com',
    class: 'Class 10',
    school: 'ABC School',
    description: 'Hi, I\'m John! I\'m a passionate web developer with a love for creating amazing user experiences.',
    location: 'New York, USA',
    profilePhoto: 'https://placekitten.com/200/200',
  });

  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProfilePhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (newProfilePhoto) {
      setUserDetails((prevDetails) => ({ ...prevDetails, profilePhoto: newProfilePhoto }));
      setNewProfilePhoto(null);
    }

    setEditMode(false);
  };

  return (
   <Layout>
     <div className="flex items-center justify-center rounded-4xl h-screen bg-gray-100 cursor-pointer">
      <div className="bg-white p-8 rounded-3xl shadow-md text-gray-800 w-96">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
            disabled={!editMode}
          />
          <img
            className="h-32 w-32 rounded-full mx-auto mb-4 border-4 border-blue-500 cursor-pointer"
            src={newProfilePhoto || userDetails.profilePhoto}
            alt="Profile"
          />
        </label>
        <h2 className="text-3xl font-bold text-blue-500 mb-2">{userDetails.name}</h2>
        <p className="text-sm text-blue-500 mb-4">
          {editMode ? (
            <input
              type="text"
              name="role"
              value={userDetails.role}
              onChange={handleInputChange}
              className="w-full border-2 border-blue-500 rounded p-2 mb-2"
            />
          ) : (
            userDetails.role
          )}
        </p>

        <div>
          <button
            className={`px-1 py-1 rounded focus:outline-none text-sm ${editMode ? 'hidden' : 'text-blue-500 hover:underline'}`}
            onClick={handleEditModeToggle}
          >
            Edit Profile
          </button>

          <div className={`${editMode ? '' : 'hidden'}`}>
            <label className="block text-sm font-medium text-blue-500 mt-4 text-center">Name:</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full border-2 border-blue-500 rounded p-2 mb-2"
            />

            <label className="block text-sm font-medium text-blue-500">Email:</label>
            <input
              type="text"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full border-2 border-blue-500 rounded p-2 mb-2"
            />

            <label className="block text-sm font-medium text-blue-500">Class:</label>
            <input
              type="text"
              name="class"
              value={userDetails.class}
              onChange={handleInputChange}
              className="w-full border-2 border-blue-500 rounded p-2 mb-2"
            />

            <label className="block text-sm font-medium text-blue-500">School/College:</label>
            <input
              type="text"
              name="school"
              value={userDetails.school}
              onChange={handleInputChange}
              className="w-full border-2 border-blue-500 rounded p-2 mb-2"
            />

            <label className="block text-sm font-medium text-blue-500">Description:</label>
            <textarea
              name="description"
              value={userDetails.description}
              onChange={handleInputChange}
              className="w-full border-2 border-blue-500 rounded p-2 mb-2"
            />

            <label className="block text-sm font-medium text-blue-500">Location:</label>
            <input
              type="text"
              name="location"
              value={userDetails.location}
              onChange={handleInputChange}
              className="w-full border-2 border-blue-500 rounded p-2 mb-4"
            />

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>

          <div className={`${editMode ? 'hidden' : ''} mt-4 text-sm text-gray-500`}>
            <p><span className="font-medium">Email:</span> {userDetails.email}</p>
            <p><span className="font-medium">Class:</span> {userDetails.class}</p>
            <p><span className="font-medium">School/College:</span> {userDetails.school}</p>
            <p><span className="font-medium">Description:</span> {userDetails.description}</p>
            <p><span className="font-medium">Location:</span> {userDetails.location}</p>
          </div>
        </div>
      </div>
    </div>
   </Layout>
  );
};

export default Profile;
