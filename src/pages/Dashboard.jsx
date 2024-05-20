import React, { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { Navigate, useParams } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import Organize from './Organize';

const Dashboard = () => {

  const {user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem('token');

  let {subpage} = useParams();

  const logout = async () => {
    try {
      const response = await fetch('https://ecosphere-backend.onrender.com/api/logout', {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
          'authorization' : `Bearer ${token}`
        }
      });
  
      const res_data = await response.json();
      console.log(res_data);
      if(response.ok){
        console.log('User Logged out successfully');
        alert('User Logged out successfully!');
        localStorage.removeItem('token');
        setUser(null);
        setRedirect(true);
      }
      else{
        console.error('Error while logging out');
      }
    } catch (error) {
      console.log("Some error occurred while logging out", error);
    }
  }

  if(redirect){
    return <Navigate to={'/login'} />
  }

  return (
    <div>

      <DashboardNav subpage={subpage}/>
      {
        subpage === undefined && (
          <div className="text-center max-w-lg mx-auto">
              Nothing to show
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