import React from 'react';


const RewardPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-tr from-sky-300 via-violet-600 to-sky-700'
    
    > 
    <div className='flex-grow'>
      
      <link rel="stylesheet" href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css" />

      <div className="flex flex-wrap justify-center text-center mb-12">
        <div className="w-full lg:w-6/12 px-4">
         
          <h1 className="text-white font-extrabold mb-3 mt-6 font-serif overline text-4xl my-5">Reward Page</h1>
          <p className="text-gray-300 text-lg mb-12 font-serif">Unlock exclusive rewards based on your credits!</p>
        </div>
      </div>

          
          <div className="min-h-full flex flex-wrap justify-center">
            {/* Item 1 */}
            <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col items-center">
                <a href="#" className="mx-auto">
                  <img
                    className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 w-full h-48 object-cover"
                    src="https://www.prodirectcricket.com/productimages/Main/193889_Main_Thumb_0381209.jpg"
                    alt="Team Member 1"
                  />
                </a>
                <div className="text-center mt-6">
                  <h1 className="text-gray-900 text-xl font-bold mb-1 font-mono">Unlock with 2000 credits</h1>
                  <button className="mt-4  bg-blue-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col items-center">
                <a href="#" className="mx-auto">
                  <img
                    className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 w-full h-48 object-cover"
                    src="https://www.scarlettmusic.com.au/assets/full/76138.jpg?20210309113931"
                    alt="Team Member 2"
                  />
                </a>
                <div className="text-center mt-6">
                  <h1 className="text-gray-900 text-xl font-bold mb-1 font-mono">Unlock with 3000 credits</h1>
                  <button className="mt-4 bg-blue-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col items-center">
                <a href="#" className="mx-auto">
                  <img
                    className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 w-full h-48 object-cover"
                    src="https://th.bing.com/th/id/OIP.OXYP8HZtkg0rlEuMKx5jQQHaE7?rs=1&pid=ImgDetMain"
                    alt="Team Member 3"
                  />
                </a>
                <div className="text-center mt-6">
                  <h1 className="text-gray-900 text-xl font-bold mb-1 font-mono">Unlock with 7000 credits</h1>
                  <button className="mt-4  bg-blue-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col items-center">
                <a href="#" className="mx-auto">
                  <img
                    className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 w-full h-48 object-cover"
                    src="https://liliputing.com/wp-content/uploads/2020/12/dragonfly-max_05-768x512.jpg"
                    alt="Team Member 4"
                  />
                </a>
                <div className="text-center mt-6">
                  <h1 className="text-gray-900 text-xl font-bold mb-1 font-mono">Unlock with 15000 credits</h1>
                  <button className="mt-4  bg-blue-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

           
          </div>
        </div>    <div className="bg-gray-800 mt-36 text-white py-4 text-center">
        <p className='text-xl font-serif'> This is just for example</p>
      </div>
      </div> 
  );
};

export default RewardPage;