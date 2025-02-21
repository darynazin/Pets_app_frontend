import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import MyPets from "./pages/MyPets.jsx";
import Emergency from "./pages/Emergency";
import Layout from "./components/Layout.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { DoctorProvider } from "./contexts/DoctorContext.jsx";
import { PetProvider } from "./contexts/PetContext.jsx";
import { AppointmentProvider } from "./contexts/AppointmentContext.jsx";

function App() {
  return (
    <UserProvider>
      <DoctorProvider>
        <PetProvider>
          <AppointmentProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/mypets" element={<MyPets />} />
                  <Route path="/emergency" element={<Emergency />} />
                  {/* <Route path="/pet/:id" element={<PetUpdate />} />
                  <Route path="/appointments/:id" element={<AppointmentUpdate />} /> */}
                </Route>
              </Routes>
            </Router>
          </AppointmentProvider>
        </PetProvider>
      </DoctorProvider>
    </UserProvider>
  );
}

export default App;
