import React from 'react';
import Layout from '../components/layout/Layout';
import { useSelector } from 'react-redux';
const ProfileStudent = () => {
  // -------------------USER OF THE SYSTEM------------------

  const {user}=useSelector(
    (state) => state.auth
  )
    const userStudent=user.user;
    
  return (
    
   <Layout>
     <div className="flex items-center justify-center h-screen">
    <div className="">
    <div class="w-full h-screen bg-white px-10 pt-10">
    <div class="relative  mb-32 max-w-sm mx-auto mt-24">
        <div class="rounded overflow-hidden shadow-md bg-white">
            <div class="absolute -mt-20 w-full flex justify-center">
                <div class="h-32 w-32">
                    <img src="https://randomuser.me/api/portraits/women/49.jpg" class="rounded-full object-cover h-full w-full shadow-md" />
                </div>
            </div>
            <div class="px-6 mt-16">
                <h1 class="font-bold text-3xl text-center mb-1">{user.user.name}</h1>
                <p class="text-gray-800 text-large font-bold text-center">Student</p>
      <div className="px-4 py-5 sm:px-6">
       
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is some information about the user.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-large font-bold text-gray-500">
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
               {user.user.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-large font-bold text-gray-500">
                Class
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                12
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-large font-bold text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                9045561231
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-large font-bold text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
               India
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div></div></div></div></div>
   </Layout>
  );
};

export default ProfileStudent;