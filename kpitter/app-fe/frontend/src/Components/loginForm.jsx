import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";  

function LoginForm() {
    const { register, handleSubmit } = useForm();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();  

    const onSubmit = async (userdata) => {
        setFormData(userdata); 

        
        localStorage.setItem("userData", JSON.stringify(userdata));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userdata),
        };

        try {
            const response = await fetch('http://localhost:8000/api/login', requestOptions);
            if (response.ok) {
                navigate('/kpitter');
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error during registration", error);
        }
    };

    return (
        <div className="modal-container">
            <h2 id="modal-registration-title">Log in form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" {...register("username")} />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" {...register("password")} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;
