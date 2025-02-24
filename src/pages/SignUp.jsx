import React from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

function SignUp() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [error, setError] = useState("");

  const handleRegister = async (values) => {
    try {
      await register(values);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <AuthForm
          isRegistering={true}
          onSubmit={handleRegister}
          error={error}
        />
      </div>
    </div>
  );
}

export default SignUp;
