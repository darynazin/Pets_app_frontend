import React from 'react'
import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";


function LogIn() {
  const navigate = useNavigate();
  const { login, register, fetchUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    petsId: '[]',
  });

  const [isRegistering, setIsRegistering] = useState(false);
  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    login(formData);
    fetchUser();
    navigate("/mypets")
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    register(formData);
    
  };

  // Handle Logout
  // const handleLogout = async () => {
  //   logout();
  // };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      
          <AuthForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={isRegistering ? handleRegister : handleLogin}
            toggleForm={() => setIsRegistering(!isRegistering)}
          />
        
      </div>
    </div>
  );
};

export default LogIn