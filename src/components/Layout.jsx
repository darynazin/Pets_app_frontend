import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useUser } from "../contexts/UserContext.jsx"; // Import the user context
import { useState, useEffect } from "react";

const Layout = () => {
  const { loading } = useUser();  // Destructure loading state
  const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   if (!loading) {
  //     setIsReady(true);
  //   }
  // }, [loading]);

  // if (!isReady) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
