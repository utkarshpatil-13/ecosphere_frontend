import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Organize = () => {

    const { action } = useParams();
    const [initiatives, setInitiatives] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const token = localStorage.getItem('token');
    const { register, handleSubmit } = useForm();

    const { user } = useContext(UserContext);
    // console.log(user);

    useEffect(() => {
        fetchInitiatives();
        fetchChallenges();
    }, []);

    const fetchInitiatives = async () => {
        try {
            const response = await fetch('https://ecosphere-backend.onrender.com/api/initiatives/user', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            })

            const res_data = await response.json();
            console.log(res_data);

            if (response.ok) {
                console.log(`Initiatives of ${user.name} Added Successfully`);
                setInitiatives(res_data.data);
            }
            else {
                console.error("Cannot fetch initiatives", response.status);
            }

        }
        catch (error) {
            console.log("Error while fetching the initiatives", error);
        }


    }

    const fetchChallenges = async () => {
        try {
            const response = await fetch('https://ecosphere-backend.onrender.com/api/challenges/user', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            })

            const res_data = await response.json();
            console.log(res_data);

            if (response.ok) {
                console.log(`Challenges of ${user.name} Added Successfully`)
                setChallenges(res_data.data);
            }
            else {
                console.error('Cannot fetch challenges', response.status);
            }

        }
        catch (error) {
            console.log("Error while fetching the challenges", error);
        }


    }


    // Initiative Form Details

    const [initiativeTitle, setInitiativeTitle] = useState('');
    const [initiativeDescription, setInitiativeDescription] = useState('');
    const [initiativeDate, setInitiativeDate] = useState(dayjs());
    const [initiativeLocation, setInitiativeLocation] = useState('');
    const [initiativeCategory, setInitiativeCategory] = useState('');
    const [initiativeImages, setInitiativeImages] = useState([]);
    const [initiativeSubmitting, setInitiativeSubmitting] = useState(false);

    const onSubmitInitiative = async() => {

        try {
            setInitiativeSubmitting(true);
            const formData = new FormData();
            formData.append("title", initiativeTitle);
            formData.append("description", initiativeDescription);
            formData.append("date", initiativeDate.toDate());
            formData.append("category", initiativeCategory);
            formData.append("location", initiativeLocation);
    
            // Append photos
            for (let i = 0; i < initiativeImages.length; i++) {
                formData.append("photos", initiativeImages[i]);
            }
    
    
            const response = await fetch('https://ecosphere-backend.onrender.com/api/initiatives', {
                method: "POST",
                headers: {
                    'authorization' : `Bearer ${token}`
                },
                body: formData
            })

            const res_data = await response.json();
            console.log(res_data);

            if(response.ok){
                console.log("Initiative Created Successfully!");
                alert("Initiative Created Successfully!");
                setInitiativeSubmitting(false);
            }
            else{
                console.error(`Initiative not created! ${res_data.message}`);
                setInitiativeSubmitting(false);
            }


        } catch (error) {
            console.log(`Error while submitting the initiative data! ${error.message}`);
            setInitiativeSubmitting(false);
        }
    }

    // Challenge Form Details
    const [challengeTitle, setChallengeTitle] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [challengeStartDate, setChallengeStartDate] = useState(dayjs());
    const [challengeEndDate, setChallengeEndDate] = useState(dayjs());
    const [challengeCategory, setChallengeCategory] = useState('');
    const [challengeReward, setChallengeReward] = useState('');
    const [challengeImages, setChallengeImages] = useState([]);
    const [challengeSubmitting, setChallengeSubmitting] = useState(false);

    const onSubmitChallenge = async() => {

        try {
            setChallengeSubmitting(true);
            console.log(token);
            const formData = new FormData();
            formData.append("title", challengeTitle);
            formData.append("description", challengeDescription);
            formData.append("startDate", challengeStartDate.toDate());
            formData.append("endDate", challengeEndDate.toDate());
            formData.append("category", challengeCategory);
            formData.append("rewards", challengeReward);
    
            // Append photos
            for (let i = 0; i < challengeImages.length; i++) {
                formData.append("photos", challengeImages[i]);
            }

            console.log(formData);
    
            const response = await fetch('https://ecosphere-backend.onrender.com/api/challenges', {
                method: "POST",
                headers: {
                    'authorization' : `Bearer ${token}`
                },
                body: formData
            })
    
            const res_data = await response.json();
    
            console.log(res_data);
            if(response.ok){
                console.log("Challenge Created Successfully!");
                alert("Challenge Created Successfully!");
                setChallengeSubmitting(false);
            }
            else{
                console.error(`Challenge not created! ${res_data.message}`);
                setChallengeSubmitting(false);
            }

            console.log(challengeStartDate);
            console.log(challengeEndDate);

        } catch (error) {
            console.log(`Error while creating the challenge ${error.message}`);
            setChallengeSubmitting(false);
        }
    }


    return (
        <div>
            {
                (action !== 'initiative' && action !== 'challenge') && (
                    <div className="text-center">
                        <h2 className='text-2xl font-bold'>Your Organized Initiatives and Challenges</h2>
                        <p className='text-md text-gray-600 mb-5'>{(initiatives.length === 0 && challenges.length === 0) && "Organize your first Challenge or Initiative" }</p>
                        <div className="text-start">
                            {
                                initiatives.length > 0 && initiatives.map((initiative, index) => (
                                    <Link to={'/dashboard/organize/'+initiative._id}>
                                    <div className="bg-slate-200 flex gap-4 rounded-2xl p-4 my-4 cursor-pointer transform transition duration-500 
                                        hover:scale-95">
                                        <div className="w-36 h-36 bg-slate-300 shrink-0 rounded-xl">
                                            <img src={initiative.images[0]} alt="" className=" object-fill w-full h-full rounded-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{initiative.title}</h2>
                                            <p className="text-sm mt-2">{initiative.description}</p>
                                        </div>
                                    </div>
                                    </Link>
                                ))
                            }
                        </div>
                        <div className="text-start">
                            {
                                challenges.length > 0 && challenges.map((challenge, index) => (
                                    <Link to={'/dashboard/organize/'+challenge._id}>
                                    <div className="bg-slate-200 flex gap-4 rounded-2xl p-4 my-4 cursor-pointer transform transition duration-500 
                                        hover:scale-95">
                                        <div className="w-36 h-36 bg-slate-300 shrink-0 rounded-xl">
                                            <img src={challenge.images[0]} alt="" className="object-fill w-full h-full rounded-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{challenge.title}</h2>
                                            <p className="text-sm mt-2">{challenge.description}</p>
                                        </div>
                                    </div>
                                    </Link>
                                ))
                            }
                        </div>
                        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full mr-2" to={'/dashboard/organize/initiative'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                            </svg>

                            Add Initiative
                        </Link>
                        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full ml-2" to={'/dashboard/organize/challenge'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                            </svg>

                            Add Challenge
                        </Link>
                    </div>
                )
            }
            {
                action === 'initiative' && (
                    
                    <div>
                        <h1 className='text-5xl font-bold text-center my-5'>Create Initiative</h1>
                        <form action="" onSubmit={handleSubmit(onSubmitInitiative)}>
                            {/* title */}
                            <h2 className="text-2xl mt-4">Title</h2>
                            <p className="text-gray-500 text-sm">Title of the event should be short and catchy</p>
                            <div className='mt-2'>
                                <input type="text" placeholder="Title, for example: Community Tree Planting Drive" value={initiativeTitle} onChange={e => setInitiativeTitle(e.target.value)} />
                            </div>

                            {/* description */}
                            <h2 className="text-2xl mt-4">Description</h2>
                            <p className="text-gray-500 text-sm">Description of the Initiative</p>
                            <div className='mt-2'>
                                <textarea className="w-full rounded-2xl p-2 h-32 border border-gray-200" placeholder='explain the complete event in detail so that user should understand everything clearly' value={initiativeDescription} onChange={e => setInitiativeDescription(e.target.value)} />
                            </div>

                            {/* Category */}
                            <h2 className="text-2xl mt-4">Category</h2>
                            <p className="text-gray-500 text-sm">Category of the Initiative</p>
                            <div className='mt-2'>
                                <input type="text" placeholder="Mention Category like : 'Recycling', 'Waste Reduction', 'Tree Planting', 'Community Cleanups'" value={initiativeCategory} onChange={e => setInitiativeCategory(e.target.value)} />
                            </div>

                            {/* photos */}
                            <h2 className="text-2xl mt-4">Photos</h2>
                            <div className="my-2">
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setInitiativeImages(e.target.files);
                                    }}
                                    multiple
                                    className="cursor-pointer flex gap-1 justify-center items-center border bg-transparent rounded p-4 text-gray-500"
                                    id="file-input"
                                />
                            </div>


                            {/* Date */}
                            <h2 className="text-2xl mt-4">Date</h2>
                            <p className="text-gray-500 text-sm">Select the date of the event</p>
                            <div className='mt-2'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={initiativeDate}
                                        onChange={(newValue) => setInitiativeDate(newValue)}
                                    />
                                </LocalizationProvider>
                            </div>

                            {/* Location */}
                            <h2 className="text-2xl mt-4">Address</h2>
                            <p className="text-gray-500 text-sm">Metion the location of event</p>
                            <div className='mt-2'>
                                <input type="text" placeholder="123/11 green street" value={initiativeLocation} onChange={e => setInitiativeLocation(e.target.value)} />
                            </div>

                            <button className="primary my-4">{initiativeSubmitting ? 'Submitting...' : 'Submit'}</button>
                        </form>
                    </div>
                )
            }
            {
                action === 'challenge' && (
                    
                    <div>
                        <h1 className='text-5xl font-bold text-center my-5'>Create Challenge</h1>
                        <form action="" onSubmit={handleSubmit(onSubmitChallenge)}>
                            {/* title */}
                            <h2 className="text-2xl mt-4">Title</h2>
                            <p className="text-gray-500 text-sm">Title of the challenge should be short and catchy</p>
                            <div className='mt-2'>
                                <input type="text" placeholder="Title, for example: 30-Day Zero Waste Challenge" value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} />
                            </div>

                            {/* description */}
                            <h2 className="text-2xl mt-4">Description</h2>
                            <p className="text-gray-500 text-sm">Description of the Challenge</p>
                            <div className='mt-2'>
                                <textarea className="w-full rounded-2xl p-2 h-32 border border-gray-200" placeholder='explain the complete challenge in detail so that user should understand every rules and regulations clearly' value={challengeDescription} onChange={e => setChallengeDescription(e.target.value)} />
                            </div>

                            {/* Category */}
                            <h2 className="text-2xl mt-4">Category</h2>
                            <p className="text-gray-500 text-sm">Category of the Challenge</p>
                            <div className='mt-2'>
                                <input type="text" placeholder="Mention Category like : 'Recycling', 'Waste Reduction', 'Tree Planting', 'Community Cleanups'" value={challengeCategory} onChange={e => setChallengeCategory(e.target.value)} />
                            </div>

                            {/* photos */}
                            <h2 className="text-2xl mt-4">Photos</h2>
                            <div className="my-2">
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setChallengeImages(e.target.files);
                                    }}
                                    multiple
                                    className="cursor-pointer flex gap-1 justify-center items-center border bg-transparent rounded p-4 text-gray-500"
                                    id="file-input"
                                />
                            </div>


                            {/* Start Date */}
                            <h2 className="text-2xl mt-4">Start Date</h2>
                            <p className="text-gray-500 text-sm">Select the start date of the challenge</p>
                            <div className='mt-2'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={challengeStartDate}
                                        onChange={(newValue) => setChallengeStartDate(newValue)}
                                    />
                                </LocalizationProvider>
                            </div>

                            {/* End Date */}
                            <h2 className="text-2xl mt-4">End Date</h2>
                            <p className="text-gray-500 text-sm">Select the end date of the challenge</p>
                            <div className='mt-2'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={challengeEndDate}
                                        onChange={(newValue) => setChallengeEndDate(newValue)}
                                    />
                                </LocalizationProvider>
                            </div>

                            {/* Rewards */}
                            <h2 className="text-2xl mt-4">Rewards</h2>
                            <p className="text-gray-500 text-sm">Metion the rewards after completing the challenge</p>
                            <div className='mt-2'>
                                <input type="text" placeholder="Zero Waste Warrior Badge, Eco Commuter Badge, etc" value={challengeReward} onChange={e => setChallengeReward(e.target.value)} />
                            </div>

                            <button className="primary my-4">{challengeSubmitting ? 'Submitting...' : 'Submit'}</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Organize