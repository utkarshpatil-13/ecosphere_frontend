import React from 'react'
import { Link, Navigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useState } from "react";

const RegisterPage = () => {

    const [submitting, setSubmitting] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { register, formState, handleSubmit } = useForm();
    const { errors } = formState;

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            const response = await fetch('https://ecosphere-backend.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const res_data = await response.json();

            if (response.ok) {
                setSubmitting(false);
                alert('Registration Successful!');
                setRedirect(true);
            }
            else {
                setSubmitting(false);
                alert(`Registration Failed! ${res_data.message}`);
            }
        }
        catch (error) {
            setSubmitting(false);
            alert(`Registration Failed!! ${error.message}`);
            console.log('Registration Failed', error);
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="min-h-screen mt-4 grow flex items-center justify-around mb-4">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Utkarsh Patil"
                        name="name"
                        id="name"
                        {...register('name', {
                            required: "Name is required"
                        })}
                    />
                    {errors.name && <p className="text-red-500 w-full mb-1 pl-2">{errors.name.message}</p>}

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
                        })}
                    />
                    {errors.email && <p className="text-red-500 w-full mb-1 pl-2">{errors.email.message}</p>}

                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        id="password"
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-500 mb-1 pl-2">{errors.password.message}</p>}

                    <input
                        type="text"
                        placeholder="street address"
                        name="location"
                        id="location"
                        {...register('location', {
                            required: "Location is required"
                        })}
                    />
                    {errors.location && <p className="text-red-500 mb-1 pl-2">{errors.location.message}</p>}

                    <button type="submit" className="primary">{submitting ? "Registering..." : "Register"}</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to='/login'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage