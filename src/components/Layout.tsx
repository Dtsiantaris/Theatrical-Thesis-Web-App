import React, { ReactNode } from "react";
import { DrawerContextProvider } from "../contexts/DrawerContext";
import { SWRConfig } from "swr";
import CssBaseline from "@material-ui/core/CssBaseline";
import { mainFetcher } from "../utils/AxiosInstances";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import { ToastContainer } from "react-toastify";
import { Theme, createStyles } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }, theme: Theme) => {
  return (
    <>
      <CssBaseline />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          dedupingInterval: 300000,
          errorRetryCount: 2,
          fetcher: mainFetcher,
        }}
      >
        <DrawerContextProvider>
          <Navbar />
          <Sidebar />
        </DrawerContextProvider>
        <div>
          <ToastContainer
            theme="colored"
            toastStyle={{ backgroundColor: "gray" }}
            position="top-center"
            autoClose={5000} // The toast will close after 5 seconds
            progressStyle={{ backgroundColor: "#30608d" }}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <main>{children}</main>
        </div>
      </SWRConfig>
    </>
  );
};

export default Layout;
