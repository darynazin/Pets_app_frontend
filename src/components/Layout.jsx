import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import { useDoctor } from "../contexts/DoctorContext.jsx";
import { useState, useEffect } from "react";

const Layout = () => {
  const { loading } = useUser();
  const { loading: doctorsLoading } = useDoctor();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading || !doctorsLoading) {
      setIsReady(true);
    }
  }, [loading]);

  if (1) {
    return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg text-gray-700 text-center p-5">
      Please wait, the data is loading...
    </div>
  </div>
);
  }

  return (
    <div data-theme="mytheme" className="font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
