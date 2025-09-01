'use client'

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginService(email, password);
            auth?.login(data);
            navigate("/stores");
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin} >
                    <input className='border p-2 rounded mb-4 w-full' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <input className='border p-2 rounded mb-4 w-full' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button className='flex mx-auto px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200' type="submit">Login</button>
                    <p className="mt-4 text-center">
                        Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
