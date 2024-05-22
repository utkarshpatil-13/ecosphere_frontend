import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UserContext from '../contexts/UserContext';

const LoginPage = () => {

    const [redirect, setRedirect] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [interestsStatus, setInterestsStatus] = useState(false);
    const { register, handleSubmit, formState, control } = useForm();
    const { user, setUser } = useContext(UserContext);
    const {errors} = formState;

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            const response = await fetch('https://ecosphere-backend.onrender.com/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const res_data = await response.json();

            console.log(res_data);

            if (response.ok) {
                console.log('Login Successfull!', response.status);
                alert(res_data.message);
                setUser(res_data.data.user);
                localStorage.setItem('token', res_data.data.accessToken);

                if (res_data.data.user.interests.length === 0) {
                    setInterestsStatus(true);
                }

                setSubmitting(false);
                setRedirect(true);
            }
            else {
                setSubmitting(false);
                alert('Login Failed!');
                console.log('Login Failed!', error);
            }
        } catch (error) {
            setSubmitting(false);
            alert('Login Failed!');
            console.log("Error occured while logging to the data", error);
        }
    }

    if (redirect) {
        if (interestsStatus) {
            return <Navigate to={'/interests'} />
        }
        return <Navigate to={'/dashboard'} />
    }

    return (
        <div className="min-h-screen grow flex items-center justify-center">
            {
                !user && (
                    <div className="mb-64">
                        <h1 className="text-4xl text-center mb-4">Login</h1>
                        <form action="" className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                name="email"
                                id="email"
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Enter a valid email address"
                                    }
                                })} />
                            {errors.email && <p className='text-red-500 w-full mt-1 ml-2'>{errors.email.message}</p>}

                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be 8 characters long"
                                    }
                                })} />
                            {errors.password && <p className='text-red-500 w-full mt-1 ml-2'>{errors.password.message}</p>}
                            <button className="primary" type="submit">{submitting ? "Logging In..." : "Login"}</button>
                            <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link className="underline text-black" to='/register'>Register now</Link></div>
                        </form>
                    </div>
                )
            }
            {
                user && (
                    <div className='text-5xl text-semibold mt-[-20vh]'>
                        Already Logged In
                    </div>
                )
            }
        </div>
    )
}

export default LoginPage