import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoctor,
  loginDoctor,
  logoutDoctor,
  registerDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getSession,
  uploadDoctorImage,
} from "../services/api";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);

      const sessionResponse = await getSession();
      if (
        !sessionResponse.data.authenticated &&
        sessionResponse.data.user.role !== "doctor"
      ) {
        setDoctor(null);
        return;
      }

      const { data } = await getDoctor();
      setDoctor(data);
    } catch (err) {
      setError("Failed to fetch doctor");
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response.data.authenticated) {
          fetchDoctor();
        } else {
          setDoctor(null);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setDoctor(null);
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await getDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (err) {
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = (query) => {
    setSearchTerm(query);
    if (!query) {
      setFilteredDoctors(doctors);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(lowercasedQuery) ||
        doctor.address.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDoctors(filtered);
  };

  const loginVet = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginDoctor(credentials);

      setDoctor(response.data.user);
      navigate("/doctor/profile");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (doctorData) => {
    try {
      setLoading(true);

      const response = await registerDoctor(doctorData);
      const doctorId = response.data._id;

      if (doctorData.image) {
        try {
          await uploadDoctorImage(doctorId, doctorData.image);
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
        }
      }

      const { data } = await getDoctor();
      setDoctor(data);
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutVet = async () => {
    try {
      setLoading(true);
      await logoutDoctor();
      setDoctor(null);
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorInfo = async (doctorData) => {
    try {
      setLoading(true);
      const response = await updateDoctor(doctorData);
      setDoctor(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctorAccount = async () => {
    try {
      setLoading(true);
      await deleteDoctor();
      setDoctor(null);
    } catch (err) {
      setError("Failed to delete doctor account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        doctors,
        loading,
        error,
        fetchDoctor,
        loginVet,
        register,
        logoutVet,
        fetchDoctors,
        updateDoctorInfo,
        deleteDoctorAccount,
        selectedDoctor,
        setSelectedDoctor,
        filterDoctors,
        filteredDoctors,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const {
    doctor,
    doctors,
    loading,
    error,
    loginVet,
    register,
    logoutVet,
    fetchDoctor,
    fetchDoctors,
    updateDoctorInfo,
    deleteDoctorAccount,
    selectedDoctor,
    setSelectedDoctor,
    filterDoctors,
    filteredDoctors,
    searchTerm,
    setSearchTerm,
  } = useContext(DoctorContext);

  return {
    doctor,
    doctors,
    loading,
    error,
    loginVet,
    register,
    logoutVet,
    fetchDoctor,
    fetchDoctors,
    updateDoctorInfo,
    deleteDoctorAccount,
    selectedDoctor,
    setSelectedDoctor,
    filterDoctors,
    filteredDoctors,
    searchTerm,
    setSearchTerm,
  };
};
