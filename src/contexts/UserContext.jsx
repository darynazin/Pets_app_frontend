import { createContext, useContext, useState, useEffect } from "react";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
} from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


    const fetchUser = async () => {
      try {
        const { data } = await getUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  const login = async (credentials) => {
    try {
      setLoading(true);
      await loginUser(credentials);
      const { data } = await getUser();
      setUser(data);
    } catch (err) {
      console.error("Login failed:", err);
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
      value={{ fetchUser, user, loading, login, register, logout, update, remove }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { fetchUser, user, loading, login, register, logout, update, remove } =
    useContext(UserContext);

  return { fetchUser, user, loading, login, register, logout, update, remove };
};
