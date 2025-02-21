import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// User APIs
export const registerUser = (userData) => api.post("/users", userData);
export const loginUser = (credentials) => api.post("/users/login", credentials);
export const logoutUser = () => api.post("/users/logout");
export const getUser = () => api.get("/users/me");
export const updateUser = (userData) => api.put("/users", userData);
export const deleteUser = () => api.delete("/users");

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
export const getPetById = (petId) => api.get(`/pets/${petId}`);
export const updatePet = (petData) => api.put("/pets", petData);

// Appointment APIs
export const getUserAppointments = () => api.get("/appointments");
export const getDoctorAppointments = (doctorId) =>
  api.get(`/appointments/${doctorId}`);
export const createAppointment = (appointmentData) =>
  api.post("/appointments", appointmentData);
export const updateAppointment = (appointmentData) =>
  api.put("/appointments", appointmentData);
export const deleteAppointment = (appointmentId) =>
  api.delete(`/appointments/${appointmentId}`);

// Image Upload APIs
export const uploadPetImage = async (petId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/upload/pets/${petId}/image`, formData, {
    headers: {},
    withCredentials: true,
  });
};

export const uploadUserImage = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/upload/users/${userId}/image`, formData, {
    headers: {},
    withCredentials: true,
  });
};

export const uploadDoctorImage = async (doctorId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/upload/doctors/${doctorId}/image`, formData, {
    headers: {},
    withCredentials: true,
  });
};

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
