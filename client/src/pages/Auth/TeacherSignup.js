import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner"
import toast from 'react-hot-toast';
import { register, reset} from "../../redux/authSlice";
import Layout from '../../components/layout/Layout';
import photo from '../../assets/Home.png'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    );

  const [role, setRole] = useState('Teacher');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob,setDob] = useState('');
  const [about, setAbout] = useState('');
  const [subject, setSubject] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [levelOfEducation, setLevelOfEducation] = useState();
  const [coursesTaught, setCoursesTaught] = useState('');
  const [school, setSchool] = useState('');

  // object
  const formData = {
    role,
    name,
    email,
    password,
    dob,
    about,
    subject,
    yearsOfExperience,
    levelOfEducation,
    coursesTaught,
    school,
  };
  const handleSubmit = (e) => {
    // Create an object with the form data
   e.preventDefault();
   try {
    dispatch(register(formData));
    
  } catch (err) {
    console.log(err);
    toast.error(err.message || "An error occurred. Please try again.");
  }
}

    useEffect(() => {
        console.log(user)
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
   }, [user, isError, message, isSuccess, dispatch, navigate]);
  
  return (
   <>
     {isLoading && <Spinner/>}
      <div className='flex justify-center items-center 'style={{ backgroundImage: `url(${photo})`,backgroundSize: 'cover',  backgroundPosition: 'right', height: '180vh'
  }} >
      <div className='w-11/12 max-w-[600px]  px-10 py-10 absolute top-10 left-10 rounded-3xl bg-white border-2 border-gray-100'>
        <div className='flex items-center mb-4'>
          <img
            src='https://www.theindianwire.com/wp-content/uploads/2019/01/IIT-Bombay.png'
            alt='Logo'
            className='w-12 h-12 mr-2'
          />
        </div>

        <h2 className='text-2xl font-semibold text-center mb-4'>
          Register an Teacher
        </h2>
        <p className='text-sm text-gray-500 text-center mb-6'>
          Please enter your details.
        </p>

        <div className='mb-4'>
          <label className='block text-sm font-medium'>Select Your Role</label>
          <select
            className='w-full border-2 border-gray-200 rounded-md p-2 bg-gray-50 focus:outline-none focus:border-indigo-500'
            value={role}
            onChange={(e) => setRole(e.target.value)}
 >
            {/* <option value='student'>Student</option> */}
            <option value='teacher'>Teacher</option>
          </select>
        </div>

        
        <div className='mb-4'>
          <div className='mb-2'>
            <label className='block text-sm font-medium'>Name</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          </div>

          {/* role ke hissab seh condition */}
          <div className='mb-2'>
              <label className='block text-sm font-medium'>Select Your Subject</label>
              <select className='w-full border-2 border-gray-50 rounded-md p-2 bg-transparent focus:border-indigo-600'
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Others">Others</option>
              </select>
            </div>
        

          <div className='mb-2'>
            <label className='block text-sm font-medium'>Email Id</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='Enter your Email-Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='mb-2'>
            <label className='block text-sm font-medium'>years Of Experience</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='Enter your experience'
             type='number'
             value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label className='block text-sm font-medium'> level Of Education</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='Level of Education' 
            value={levelOfEducation}
            onChange={(e) => setLevelOfEducation(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label className='block text-sm font-medium'>About</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='somethong about yourself'
    
             value={about}
            onChange={(e) => setAbout(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label className='block text-sm font-medium'>Date Of birth</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='Date Of birth' type='date' 
            value={dob}
            onChange={(e) => setDob(e.target.value)}/>
          </div>
          <div className='mb-2'>
              <label className='block text-sm font-medium'>Course Taught</label>
              <select className='w-full border-2 border-gray-50 rounded-md p-2 bg-transparent focus:border-indigo-600'
              value={coursesTaught}
              onChange={(e)=>setCoursesTaught(e.target.value)}>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Others">Others</option>
              </select>
            </div>
          <div className='mb-2'>

            <label className='block text-sm font-medium'>Password</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='Enter your Password' 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
         </div>

          <div className='mb-2'>
            <label className='block text-sm font-medium'>School/College</label>
            <input className='w-full border-2 border-gray-100 rounded-md p-2 bg-transparent' placeholder='Enter your school/college name' 
            value={school}
            onChange={(e) => setSchool(e.target.value)}/>
          </div>
        </div>

          <div className='flex flex-col gap-y-4'>
          <button className='w-full py-3 bg-indigo-500 text-white rounded-md font-semibold text-md hover:bg-indigo-600'
          onClick={handleSubmit}>
            Sign Up
          </button>

          <button className='w-full flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-3 rounded-md text-gray-700 font-semibold text-md border-2 border-gray-100 '>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z' fill='#EA4335' />
              <path d='M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z' fill='#34A853' />
              <path d='M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z' fill='#4A90E2' />
  <path d='M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z' fill='#FBBC05' />
            </svg>
            Sign Up with Google
          </button>

          
        </div>

        <div className='mt-4 text-center text-gray-600'>
          Already have an account?{' '}
          <a onClick={()=>navigate('/login')} href='' className='text-indigo-500 hover:underline'>
            Log in here
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;