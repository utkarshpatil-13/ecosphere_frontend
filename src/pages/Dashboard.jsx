import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { Navigate, useParams } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import Organize from './Organize';

const Dashboard = () => {

  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem('token');

  console.log(user);

  const [participatedChallenges, setParticipatedChallenges] = useState([]);
  const [participatedInitiatives, setParticipatedInitiatives] = useState([]);

  let { subpage } = useParams();

  const logout = async () => {
    try {
      const response = await fetch('https://ecosphere-backend.onrender.com/api/logout', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        console.log('User Logged out successfully');
        alert('User Logged out successfully!');
        localStorage.removeItem('token');
        setUser(null);
        setRedirect(true);
      }
      else {
        alert(`Error while logging out! ${res_data.message}`);
        console.error(`Error while logging out! ${res_data.message}`);
      }
    } catch (error) {
      alert(`Some error occurred while logging out! ${error.message}`);
      console.log(`Some error occurred while logging out! ${error.message}`);
    }
  }

  useEffect(() => {
    fetchChallenges();
    fetchInitiatives();
  }, [user, token]);

  const fetchChallenges = async () => {
    console.log(user.challengesParticipated);
    try {
      const response = await fetch(`https://ecosphere-backend.onrender.com/api/challenges/ids`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: user.challengesParticipated })
      });

      const res_data = await response.json();

      console.log(res_data);

      if (response.ok) {
        setParticipatedChallenges(res_data.data);
        console.log("Challenges Added Successfully");
      }
    } catch (error) {
      console.log(`Error while fetching the challenges ${error.message}`);
    }
  };

  const fetchInitiatives = async () => {
    console.log(user.initiativesParticipated);
    try {
      const response = await fetch('https://ecosphere-backend.onrender.com/api/initiatives/ids', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: user.initiativesParticipated })
      });

      const res_data = await response.json();

      console.log(res_data);

      if (response.ok) {
        setParticipatedInitiatives(res_data.data);
        console.log("Initiatives Added Successfully");
      }
    } catch (error) {
      console.log(`Error while fetching the initiatives ${error.message}`);
    }
  };

  const formatDate = (date) => {
    const new_date = new Date(date);
    return new_date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (redirect) {
    return <Navigate to={'/login'} />
  }

  console.log(participatedChallenges);
  console.log(participatedInitiatives);

  return (
    <div>

      <DashboardNav subpage={subpage} />
      {
        subpage === undefined && (
          <div className="w-full">
            <div className='flex justify-center items-center max-md:flex-col max-md:gap-5 max-md:text-lg'>

              {/* Total Participated Events Till now */}
              <div className='inline-block bg-white p-4 border border-slate-200 rounded-2xl text-center mx-2'>
                <h2 className='text-md text-slate-500'>Total Participation</h2>
                <p className='text-3xl font-semibold text-center mt-2'>{(participatedChallenges && participatedInitiatives) && participatedChallenges.length + participatedInitiatives.length}</p>
                {(participatedChallenges.length !== 0 && participatedInitiatives.length !== 0) && <p className='text-sm text-slate-500 mt-2'>increase from last month</p>}
              </div>

              {/* Rewards */}
              <div className='inline-block bg-white p-4 border border-slate-200 rounded-2xl text-center mx-2'>
                <h2 className='text-md text-slate-500'>Rewards Won</h2>
                <p className='text-3xl font-semibold text-center mt-2'>{(user && user.rewards) && user.rewards.length}</p>
                <p className='text-sm text-slate-500 mt-2'>participate in challenges</p>
              </div>
            </div>
            <div className='my-10 border border-slate-300 rounded-2xl py-10 px-5'>
              <h2 className='text-5xl text-bold text-center font-normal'>Participated Initiatives</h2>
              {
                participatedInitiatives.length > 0 && participatedInitiatives.map((initiative, index) => (
                  <div className="border border-slate-200 mt-10 flex gap-4 items-center rounded-2xl overflow-hidden shadow-gray-400 shadow-md max-md:flex-col">
                    <div className="w-36 h-36 max-md:w-full max-md:h-fit">
                      <img className="object-fill w-full h-full md:rounded-l-xl" key={index} src={initiative.images[0]} alt="" />
                    </div>
                    <div className="py-3 pr-3 grow max-md:pr-0 max-md:text-center max-md:w-full">
                      <h2 className="font-bold text-xl">{initiative.title}</h2>
                      <div className="flex gap-2 border-t border-gray-300 mt-2 py-2 max-md:justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        {formatDate(initiative.date)}
                      </div>
                      <div className="flex gap-2 max-md:flex-col max-md:text-center max-md:my-5">
                        <span className='font-semibold'> <b>Category: </b> {initiative.category}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 max-md:hidden">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
</svg>



                        <span className='max-md:hidden'>|</span>
                        <span className='font-semibold'> <b>Address: </b> {initiative.location}</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 max-md:hidden">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>




                      </div>
                    </div>
                  </div>
                ))
              }
              {
                participatedInitiatives.length == 0 && (
                  <p className='text-xl text-gray-500 text-center mt-5'>No Initiatives Participated till now</p>
                )
              }
            </div>
            <div className='my-10 border border-slate-300 rounded-2xl py-10 px-5'>
              <h2 className='text-5xl text-bold text-center font-normal'>Participated Challenges</h2>
              {
                participatedChallenges.length > 0 && participatedChallenges.map((challenge, index) => (
                  <div className="border border-slate-200 mt-10 flex gap-4 items-center rounded-2xl overflow-hidden shadow-gray-400 shadow-md max-md:flex-col">
                    <div className="w-36 h-36 max-md:w-full max-md:h-fit">
                      <img className="object-fill w-full h-full md:rounded-l-xl" key={index} src={challenge.images[0]} alt="" />
                    </div>
                    <div className="py-3 pr-3 grow max-md:pr-0 max-md:text-center max-md:w-full">
                      <h2 className="font-bold text-xl ">{challenge.title}</h2>
                      <div className="flex gap-2 border-t border-gray-300 mt-2 py-2 max-md:justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        {formatDate(challenge.startDate)} to <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        {formatDate(challenge.endDate)}
                      </div>
                      <div className="flex gap-2 max-md:flex-col max-md:text-center max-md:my-5">
                        <span className='font-semibold'> <b>Category: </b> {challenge.category}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 max-md:hidden">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
</svg>


                        <span className='max-md:hidden'>|</span>
                        <span className='font-semibold'> <b>Rewards: </b> {challenge.rewards}</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 max-md:hidden">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>


                      </div>
                    </div>
                  </div>
                ))
              }
              {
                participatedChallenges.length == 0 && (
                  <p className='text-xl text-gray-500 text-center mt-5'>No Challenges Accepted till now</p>
                )
              }
            </div>
          </div>
        )
      }
      {
        subpage === 'profile' && (
          <div className="text-center max-w-lg mx-auto">
            Logged in as {user?.name} ({user?.email})<br />
            <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
          </div>
        )
      }
      {
        subpage === 'organize' && (
          <Organize />
        )
      }

    </div>
  )
}

export default Dashboard