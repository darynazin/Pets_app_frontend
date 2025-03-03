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

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow my-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
