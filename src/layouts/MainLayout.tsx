import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"

const MainLayout = () => {
  return (
    <main className="font-poppins relative">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
