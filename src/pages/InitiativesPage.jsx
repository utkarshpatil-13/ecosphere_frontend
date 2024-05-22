import React, { useContext, useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    maxHeight: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
};

const InitiativesPage = ({count}) => {

    const [initiatives, setInitiatives] = useState([]);
    const [selectedInitiative, setSelectedInitiative] = useState(null);
    const token = localStorage.getItem('token');
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    let filteredInitiatives = initiatives;
    if(count !== undefined){
        filteredInitiatives = initiatives.slice(0, count);
    }

    useEffect(() => {
        fetchInitiatives();
    }, []);
    

    const fetchInitiatives = async () => {
        try {
          const response = await fetch('https://ecosphere-backend.onrender.com/api/initiatives', {
            method: "GET",
            headers: {
              'Content-Type' : 'application/json'
            }
          }); 
          
          const res_data = await response.json();
    
          console.log(res_data);
          
          if(response.ok){
            console.log("Initiatives Added Successfully");
            setInitiatives(res_data.data);
          }
        } catch (error) {
          console.log("Error while fetching the initiatives", error);
        }
      }

    // challenge modal states
    const handleOpen = (initiative) => {
        setSelectedInitiative(initiative);
    };

    const handleClose = () => {
        setSelectedInitiative(null);
    };

    const formatDate = (date) => {
        const new_date = new Date(date);
        return new_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


      const joinInitiative = async (id) => {
        console.log(id);
        if (user) {
            try {
                const response = await fetch(`https://ecosphere-backend.onrender.com/api/initiatives/${id}/join`, {
                    method: "PUT",
                    headers: {
                        'authorization' : `Bearer ${token}`
                    }
                });
        
                const res_data = await response.json();
                console.log(res_data);
    
                if(response.ok){
                    alert(`You have successfully joined the ${res_data.data.title} challenge!!`);
                    updateUser(res_data.data._id);
                    setUser((prevUser) => ({
                        ...prevUser,
                        initiativesParticipated: [...prevUser.initiativesParticipated, res_data.data._id]
                    }));
                }
                else{
                    console.error("Couldn't join the challenge", response.status);
                }
            } catch (error) {
                alert("Challenge alredy joined!");
                console.log("Error in joining the challenge", error);
            }
        }
        else{
            alert("User need to first login!");
            navigate('/login');
        }
    }

    const updateUser = async (id) => {
        try{
            const response = await fetch(`https://ecosphere-backend.onrender.com/api/join/initiative/${id}`, {
                method: "PUT",
                headers: {
                    'authorization' : `Bearer ${token}`
                }
            });
    
            const res_data = await response.json();
            console.log(res_data);

            if(response.ok){
                console.log("User updated successfully!");
                handleClose();
            }
            else{
                console.error("Couldn't update the user", response.status);
            }
        }   
        catch(error){
            console.log("Error while updating the user after joining the initiative");
        }
    }


  return (
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredInitiatives.map((initiative, index) => (
        <div className='cursor-pointer' key={index} onClick={() => handleOpen(initiative)}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            <img className="rounded-2xl object-cover aspect-square" src={initiative.images[0]} alt={`Photo ${index}`} />
          </div>
          <h2 className="text-lg font-bold">{initiative.title}</h2>
          <p className="mt-2 text-gray-600">{initiative.description}</p>
          <h3 className="text-md">{initiative.location}</h3>
        </div>
      ))}
      <Modal
                open={!!selectedInitiative}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedInitiative && (
                        <>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {selectedInitiative.title}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {selectedInitiative.description}
                            </Typography>

                            {/* Carousel for Images */}
                            <Box sx={{ mt: 4 }}> {/* Adjust margin here */}
                                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                                    {selectedInitiative.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} className='object-cover aspect-square' alt={`Image ${index}`} />
                                        </div>
                                    ))}
                                </Carousel>
                            </Box>

                            {/* Additional Information */}
                            <Typography sx={{ mt: 2 }}>
                                <strong>Date:</strong> {formatDate(selectedInitiative.date)}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Category:</strong> {selectedInitiative.category}
                            </Typography>

                            <Button sx={{ mt: 2 }} variant="contained" color="success" onClick={() => joinInitiative(selectedInitiative._id)}>
                                Join Initiative!
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
    </div>
  )
}

export default InitiativesPage