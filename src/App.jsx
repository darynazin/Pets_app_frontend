import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import MyPets from "./pages/MyPets.jsx";
import Emergency from "./pages/Emergency";
import PetRegistrationPage from "./pages/PetRegistrationPage.jsx";
import PetEditPage from "./pages/PetEditPage.jsx";
import OwnerProfile from "./pages/OwnerProfile.jsx";
import AppointmentBooking from "./pages/AppointmentBooking.jsx";
import AppointmentPage from "./pages/AppointmentPage.jsx";
import VetProfile from "./pages/VetProfile.jsx";
import Layout from "./components/Layout.jsx";
import VetLogIn from "./pages/vetLogin.jsx";
import VetSignUp from "./pages/VetSignUp.jsx";
import VetSchedule from "./pages/VetSchedule.jsx";
import VetAI from "./pages/VetAI.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { DoctorProvider } from "./contexts/DoctorContext.jsx";
import { PetProvider } from "./contexts/PetContext.jsx";
import { AppointmentProvider } from "./contexts/AppointmentContext.jsx";
import FindVet from "./pages/FindVet.jsx";

function App() {
  return (
    <Router>
      <UserProvider>
        <DoctorProvider>
          <PetProvider>
            <AppointmentProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/vet/login" element={<VetLogIn />} />
                  <Route path="/vet/signup" element={<VetSignUp />} />
                  <Route path="/vet/schedule" element={<VetSchedule />} />
                  <Route path="/mypets" element={<MyPets />} />
                  <Route
                    path="/mypets/register"
                    element={<PetRegistrationPage />}
                  />
                  <Route path="/pets/:id/edit" element={<PetEditPage />} />
                  <Route path="/search" element={<FindVet />} />
                  <Route path="/profile" element={<OwnerProfile />} />
                  <Route path="/vet/profile" element={<VetProfile />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/ai" element={<VetAI />} />
                  <Route
                    path="/appointments/book/:doctorId"
                    element={<AppointmentBooking />}
                  />
                  {/* <Route path="/pet/:id" element={<PetUpdate />} /> */}
                  <Route
                    path="/appointments/:id"
                    element={<AppointmentPage />}
                  />
                </Route>
              </Routes>
            </AppointmentProvider>
          </PetProvider>
        </DoctorProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
