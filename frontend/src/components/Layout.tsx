import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../sections/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
