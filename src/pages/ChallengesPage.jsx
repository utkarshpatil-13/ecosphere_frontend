import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import for modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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


const ChallengesPage = ({count}) => {
    const [challenges, setChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const token = localStorage.getItem('token');
    const {user, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    let filteredChallenges = challenges;
    if(count !== undefined){
        filteredChallenges = challenges.slice(0, count);
    }

    useEffect(() => {
        fetchChallenges();
    }, []);

    const formatDate = (date) => {
        const new_date = new Date(date);
        return new_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const fetchChallenges = async () => {
        try {
            const response = await fetch('https://ecosphere-backend.onrender.com/api/challenges', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const res_data = await response.json();

            console.log(res_data);

            if (response.ok) {
                console.log("Challenges Added Successfully");
                setChallenges(res_data.data);
            }
        } catch (error) {
            console.log(`Error while fetching the challenges ${error.message}`);
        }
    };

    // challenge modal states
    const handleOpen = (challenge) => {
        setSelectedChallenge(challenge);
    };

    const handleClose = () => {
        setSelectedChallenge(null);
    };

    const joinChallenge = async (id) => {
        console.log(id);
        if(user){
            try {
                const response = await fetch(`https://ecosphere-backend.onrender.com/api/challenges/${id}/join`, {
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
                        challengesParticipated: [...prevUser.challengesParticipated, res_data.data._id]
                    }));
                }
                else{
                    console.error(`Couldn't join the challenge! ${res_data.message}`);
                }
            } catch (error) {
                alert(`Error in joining the challenge! ${error.message}`);
                console.log(`Error in joining the challenge ${error.message}`);
            }
        }
        else{
            alert("User need to first login!");
            navigate('/login');
        }
    }

    const updateUser = async (id) => {
        try{
            const response = await fetch(`https://ecosphere-backend.onrender.com/api/join/challenge/${id}`, {
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
                alert(`Couldn't update the user ${res_data.message}`);
                console.error(`Couldn't update the user ${res_data.message}`);
            }
        }   
        catch(error){
            alert(`Error while updating the user after joining the challenge ${error.message}`)
            console.log(`Error while updating the user after joining the challenge ${error.message}`)
        }
    }

    return (
        <div className="mt-8 grid gap-6 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-md:w-full max-md:text-center max-md:p-2 max-md:text-lg">
            {filteredChallenges.map((challenge, index) => (
                <div key={index} className='cursor-pointer max-md:text-lg' onClick={() => handleOpen(challenge)}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        <img className="rounded-2xl object-cover aspect-square" src={challenge.images[0]} alt={`Photo ${index}`} />
                    </div>
                    <h2 className="text-lg font-bold max-md:text-2xl">{challenge.title}</h2>
                    <p className="mt-2 text-gray-600">{challenge.description}</p>
                    <h3 className="text-md mt-2 max-md:font-semibold">{formatDate(challenge.startDate)}</h3>
                </div>
            ))}
            <Modal
                open={!!selectedChallenge}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedChallenge && (
                        <>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {selectedChallenge.title}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {selectedChallenge.description}
                            </Typography>

                            {/* Carousel for Images */}
                            <Box sx={{ mt: 4 }}> {/* Adjust margin here */}
                                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                                    {selectedChallenge.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Image ${index}`} />
                                        </div>
                                    ))}
                                </Carousel>
                            </Box>

                            {/* Additional Information */}
                            <Typography sx={{ mt: 2 }}>
                                <strong>Start Date:</strong> {formatDate(selectedChallenge.startDate)}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>End Date:</strong> {formatDate(selectedChallenge.endDate)}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Category:</strong> {selectedChallenge.category}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Rewards:</strong> {selectedChallenge.rewards}
                            </Typography>

                            <Button sx={{ mt: 2 }} variant="contained" color="success" onClick={() => joinChallenge(selectedChallenge._id)}>
                                Accept Challenge!
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default ChallengesPage;
