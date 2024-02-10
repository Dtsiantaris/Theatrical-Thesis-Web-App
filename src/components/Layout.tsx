import React, { ReactNode } from "react";
// mui
import CssBaseline from "@mui/material/CssBaseline";
// components
import { DrawerContextProvider } from "../contexts/DrawerContext";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
//utils
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full">
      <CssBaseline />
      <DrawerContextProvider>
        <Navbar />
        <div className="fixed sm:static z-50">
          <Sidebar />
        </div>
      </DrawerContextProvider>
      <div
        className="flex-1 overflow-auto" // Apply this class only on screens sm and larger
      >
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={5000}
          progressStyle={{ backgroundColor: "#30608d" }}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <main className="p-5 pl-10 sm:pl-5 box-border">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
