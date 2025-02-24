import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
  getSession,
} from "../services/api";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await getUser();
      setUser(data);
    } catch (err) {
      setError(err.message || "Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response.data.authenticated) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      setUser(response.data.user);
      navigate("/mypets");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password", err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      await registerUser(userData);
      const { data } = await getUser();
      setUser(data);
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (userData) => {
    try {
      setLoading(true);
      const response = await updateUser(userData);
      setUser(response.data);
    } catch (err) {
      console.error("Failed to update user:", err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      setLoading(true);
      await deleteUser();
      setUser(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        fetchUser,
        user,
        loading,
        login,
        register,
        logout,
        update,
        remove,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const {
    fetchUser,
    user,
    loading,
    login,
    register,
    logout,
    update,
    remove,
    error,
  } = useContext(UserContext);

  return {
    fetchUser,
    user,
    loading,
    login,
    register,
    logout,
    update,
    remove,
    error,
  };
};
