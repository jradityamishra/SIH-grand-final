import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { postLiveclassData, getLiveClassData } from '../../redux/liveClassSlice'
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';
const OnlineClass = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  );


  const teacherId = user.user._id;
  console.log("teachet:", teacherId)
  // ================ DATE==================
  const formattedDate = new Date().toISOString().split('T')[0]

  console.log(teacherId);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState(user.user.subjectsTaught[0]);
  const [time, setTime] = useState('');
  const [saveLink, setsaveLink] = useState([]);
  const [rating, setRating] = useState(null);


  // =======handle rating==================

  const handleRatingChange = async(value) => {
     setRating(value);
     try{
      const data=await axios.post(`/api/v1/liveclass/rating/${teacherId}`,
      {rating:value})
      console.log("data:",data);
     }catch(error){
      toast.error("something wrong in rating")
     }
console.log(value);
   
  };
  // ================SAVE DATA==================

 const handleSubmit=async(e)=>{
  console.log(description,link,subject,time)
  e.preventDefault();
  try{
    
      const res=await axios.post(`/api/v1/liveclass/${teacherId}`,
   { description: description,
          joiningLink: link,
          subject: subject,
          Time: time})
          console.log("res:",res)
    
  }catch(error){
    toast.error(error.message)
  }
 }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`/api/v1/liveclass/${teacherId}`,
  //       {
  //         description: description,
  //         joiningLink: link,
  //         subject: subject,
  //         Time: time
  //       })
  //     // console.log("resget:",res)
  //     if (res) {
  //       toast.success('Your data is Save')
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message || 'error in saving live Class detail ')
  //   }

  // };

  // ================START CLASS==================

  
  const startclass = async () => {

    try {
      const res = await axios.get('/api/v1/liveclass/get')
      res.data.data.map((e) => {
        console.log(e)
        setsaveLink(e);

      })

      if (res) {
        toast.success('Your data is Save')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'error in saving live Class detail ')
    }

  }

  // =============RATING BUTTON=============
  
  useEffect(() => {
    startclass()
  }, [])
   

  // =============RATING BUTTON=============
  
  useEffect(() => {
    startclass()
  }, [])

  return (
    <Layout><div className="ml-56">
      
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="bg-blue-500 text-white py-4 text-center">
          <h1 className="text-4xl font-bold">Live Classes</h1>
        </div>

        <div className="container mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl max-w-2xl">
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              subject
            </label>
            {user.user.role === 'teacher' ? <input
              id="subject"
              type="subject"
              placeholder={user.user.subjectsTaught}
              value={user.user.subjectsTaught}
              //  onChange={(e)=>setSubject(e.target.value)}
             
              //  onChange={(e)=>setSubject(e.target.value)}
              // onChange=(setSubject(value)}
              className="border p-3 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            /> : ''}
          </div>

          <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Subject</h2>
            <p className="text-gray-700">{saveLink.subject}</p>
           
          </div>

          <div className="mb-6">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            {user.user.role === 'teacher' ? <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
             
              className="border p-3 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            /> : ''}
          </div>

          <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Today's Lecture Time</h2>
            <p className="text-gray-700">{saveLink.Timing}</p>
           
          </div>

          <div className="mb-6">
            {user.user.role === 'teacher' ? <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Paste Links/URLs
            </label> : ''}
            {user.user.role === 'teacher' ? <input
              id="link"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border p-3 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Paste links here..."
            /> : ''}
          </div>

          {/* <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div> */}

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            {user.user.role === 'teacher' ? <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3 w-full mt-1 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
              rows="6"
              placeholder="Write your description here..."
            ></textarea> : ''}
          </div>

          <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Today topic Description</h2>
            <p className="text-gray-700">{saveLink.description}</p>
          </div>

          <div className="flex justify-between">
            {user.user.role === 'teacher' ? <button
              className="bg-blue-600 text-white mt-4 py-4 px-10 text-xl rounded-md font-bold hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={handleSubmit}
            >
              Save Data
            </button> : ''}
            <button
              className="bg-blue-600 text-white mt-4 py-4 px-10 text-xl rounded-md font-bold hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => window.open(saveLink.joiningLink)}
            >
              Start your Class
            </button>
          </div>

          {/* rating */}

          <div className="flex justify-center p-10">
      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={value}
            checked={rating === value}
            onChange={() => handleRatingChange(value)}
            className="sr-only"
          />
          <svg
            className={`w-8 h-8 ms-3 ${
              rating && value <= rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </label>
      ))}
      {rating && <p className="ml-2">You rated {rating} stars.</p>}
    </div>
        </div>



        <div className="bg-blue-500 text-white py-4 text-center mt-10">
          <p>&copy; 2023 Live Classes. All rights reserved.</p>
        </div>
      </div>




    </div></Layout>
  );
};

export default OnlineClass;