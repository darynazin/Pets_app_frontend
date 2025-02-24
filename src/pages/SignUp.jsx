import React from 'react'
import { useUser } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import AuthForm from '../components/AuthForm';

function SignUp() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
    
  });

  const handleRegister = async (values) => {
    await register(values);
    navigate("/login")
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
    
        <AuthForm
          isRegistering={true}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleRegister}
        />
      
    </div>
  </div>
  )
}

export default SignUp