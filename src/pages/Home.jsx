import React, { useEffect, useState } from 'react';
import image from '../assets/homepage.jpg';
import { Link } from 'react-router-dom';
import ChallengesPage from './ChallengesPage';
import InitiativesPage from './InitiativesPage';

const Home = () => {

  // useEffect(() => {
    // fetchInitiatives();
    // fetchChallenges();
    // Set loading to false when everything is loaded
  // }, []);

  // const fetchInitiatives = async () => {
  //   try {
  //     const response = await fetch('https://ecosphere-backend.onrender.com/api/initiatives', {
  //       method: "GET",
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const res_data = await response.json();
  //     if (response.ok) {
  //       setInitiatives(res_data.data);
  //     }
  //   } catch (error) {
  //     console.log('Error while fetching the initiatives', error);
  //   }
  // };

  // const fetchChallenges = async () => {
  //   try {
  //     const response = await fetch('https://ecosphere-backend.onrender.com/api/challenges', {
  //       method: "GET",
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const res_data = await response.json();
  //     if (response.ok) {
  //       setChallenges(res_data.data);
  //     }
  //   } catch (error) {
  //     console.log('Error while fetching the challenges', error);
  //   }
  // };

  return (
    <>
      <div className=''>
        {/* Hero Section */}
        <div className="flex items-center max-md:flex-col max-md:w-full max-md:pt-10">
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-5xl font-bold">Join The Movement For A Greener Future</h1>
            <p className='max-md:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dolore alias exercitationem, a similique quibusdam error mollitia vero provident fugit culpa, repudiandae, laudantium animi ex.</p>
            <Link className="w-[20vw] items-center px-3 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 max-md:w-[20vh] max-md:text-xl" to={'/register'}>Join Now</Link>
          </div>
          <div className="w-[80vw]">
            <img src={image} className="object-cover aspect-square" alt="" />
          </div>
        </div>

        {/* Latest Initiatives */}
        <div className="my-5 max-md:flex max-md:flex-col max-md:w-full">
          <div>
            <h1 className="text-5xl font-bold text-center">Latest Initiatives</h1>
          </div>
          <InitiativesPage count={4} />
          <div className="flex justify-end max-md:justify-center">
            <Link to={'/initiatives'} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm my-4 px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 max-md:text-xl">
              View all
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Latest Challenges */}
        <div className="my-5">
          <div>
            <h1 className="text-5xl font-bold text-center">Latest Challenges</h1>
          </div>
          <ChallengesPage count={4} />
          <div className="flex justify-end max-md:justify-center">
            <Link to={'/challenges'} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 max-md:text-xl">
              View all
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
