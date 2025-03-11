import { createContext, useContext, useState } from "react";
import {
  getUserAppointments,
  getDoctorAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
} from "../services/api";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const { data } = await getUserAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch user appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleAppointment = async (appointmentId) => {
    try {
      const { data } = await getAppointmentById(appointmentId);
      setAppointment(data);
    } catch (err) {
      console.error("Failed to fetch appointment:", err);
      return null;
    }
  }
    

  const fetchDoctorAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await getDoctorAppointments();
      setDoctorAppointments(data);
    } catch (err) {
      console.error("Failed to fetch doctor appointments:", err);
      setDoctorAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      await createAppointment(appointmentData);
    } catch (err) {
      console.error("Failed to create appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  const editAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      await updateAppointment(appointmentData);
    } catch (err) {
      console.error("Failed to update appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      await deleteAppointment(appointmentId);
    } catch (err) {
      console.error("Failed to delete appointment:", err);
    } finally {
      setLoading(false);
      fetchDoctorAppointments();
      fetchAppointments();
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        fetchAppointments,
        appointments,
        loading,
        addAppointment,
        editAppointment,
        removeAppointment,
        fetchDoctorAppointments,
        fetchSingleAppointment,
        appointment,
        doctorAppointments
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const {
    fetchAppointments,
    appointments,
    loading,
    addAppointment,
    editAppointment,
    removeAppointment,
    fetchDoctorAppointments,
    fetchSingleAppointment,
    appointment,
    doctorAppointments
  } = useContext(AppointmentContext);

  return {
    fetchAppointments,
    appointments,
    loading,
    addAppointment,
    editAppointment,
    removeAppointment,
    fetchDoctorAppointments,
    fetchSingleAppointment,
    appointment,
    doctorAppointments
  };
};
