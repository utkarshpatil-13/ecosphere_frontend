import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const Interests = () => {

    const [data, setData] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchInterests();
    }, []);

    const fetchInterests = async () => {
        try{
            const response = await fetch('https://ecosphere-backend.onrender.com/api/interests', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const res_data = await response.json();
            console.log(res_data);

            if(response.ok){
                setData(res_data.data);
            }
        }
        catch(error){
            console.log("Error while fetching the interests", error);
        }
    }

    const onHandleUserInterestsClick = (interest) => {

        if(!userInterests.includes(interest)){
            setUserInterests([...userInterests, interest]);
        }
        else{
            setUserInterests(userInterests.filter((data) => data !== interest));
        }

    }

    const onSubmit = async () => {
        console.log(userInterests);
        try {
            const response = await fetch('https://ecosphere-backend.onrender.com/api/profile', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
                    interests: userInterests
                })
            });
    
            console.log(response);
    
            // Ensure you only parse the JSON if the response is OK
            if (response.ok) {
                const res_data = await response.json();
                console.log(res_data);
                alert("Interests added successfully");
                console.log("Interests added successfully");
                setRedirect(true);
            } else {
                console.error("Failed to add interests" || response.statusText);
                alert("Interests not added");
                console.log(response.status);
            }
        } catch (error) {
            console.log("Error while updating interests of the user", error);
        }
    };

    if(redirect){
        return <Navigate to={'/dashboard'} />
    }
    

  return (
    <div>

        <h2 className='text-6xl font-semibold text-center my-10'>Select your different interests for environmental well-being?</h2>
        <div className='mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>            
            {
                data.map((field) => (
                    <div class="max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-center">
                    <a href="#">
                        <img class="rounded-t-xl object-cover aspect-square" src={field.image} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{field.interest}</h5>
                        </a>
                        <a href="#" class="inline-flex items-center my-2 mx-2 px-3 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => {
                            onHandleUserInterestsClick(field.interest);
                        }}>
                            <span className='text-md'>{userInterests.includes(field.interest) ? 'Added' : 'Add Interest'}</span>
                        </a>
                    </div>
                </div>
                ))
            
            }
        </div>
        
        <div className="bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 p-2 my-4 max-w-md text-white rounded-2xl mx-auto text-center cursor-pointer" type="submit" onClick={onSubmit}>Submit</div>

    </div>
  )
}

export default Interests