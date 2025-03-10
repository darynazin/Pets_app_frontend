import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// User APIs
export const registerUser = (userData) => {
  const formData = new FormData();
  return api.post("/users", userData, {
  });
};
export const loginUser = (credentials) => api.post("/users/login", credentials);
export const logoutUser = () => api.post("/users/logout");
export const getUser = () => api.get("/users/me");
export const updateUser = async (userData) => {
  const response = await api.put("/users", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const deleteUser = () => api.delete("/users");
export const getSession = () => api.get("/doctors/session");

// Doctor APIs
export const registerDoctor = (doctorData) => api.post("/doctors", doctorData);
export const loginDoctor = (credentials) =>
  api.post("/doctors/login", credentials);
export const logoutDoctor = () => api.post("/doctors/logout");
export const getDoctors = () => api.get("/doctors");
export const getDoctor = () => api.get("/doctors/me");
export const updateDoctor = (doctorData) => api.put("/doctors", doctorData);
export const deleteDoctor = () => api.delete("/doctors");

// Pet APIs
export const createPet = (petData) => api.post("/pets", petData);
export const getMyPets = () => api.get("/pets");
export const getPetById = async (petId) => {
  try {
    const response = await api.get(`/pets/${petId}`);
    return response;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
export const updatePet = (petData) => api.put("/pets", petData);
export const deletePet = (petId) => api.delete(`/pets/${petId}`);

// Appointment APIs
export const getUserAppointments = () => api.get("/appointments");
export const getDoctorAppointments = () =>
  api.get(`/appointments/doctor`);
export const createAppointment = (appointmentData) =>
  api.post("/appointments", appointmentData);
export const updateAppointment = (appointmentData) =>
  api.put("/appointments", appointmentData);
export const deleteAppointment = (appointmentId) =>
  api.delete(`/appointments/${appointmentId}`);
export const getAppointmentById = (appointmentId) =>
  api.get(`/appointments/one/${appointmentId}`);

// Image Upload APIs

export const uploadPetImage = async (petId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/upload/pets/${petId}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const uploadUserImage = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/upload/users/${userId}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const uploadDoctorImage = async (doctorId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/upload/doctors/${doctorId}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

// time slot API
export const getAvailableTimeSlots = (doctorId, date) => {
  return api.get(`/appointments/available?doctorId=${doctorId}&date=${date}`);
};


// AI api
export const getRecommendations = (query) => {
  return api.post("/api/v1/chat/completions", { message: query});
};