import React, { ReactNode } from "react";
import { DrawerContextProvider } from "../contexts/DrawerContext";
import { SWRConfig } from "swr";
import CssBaseline from "@material-ui/core/CssBaseline";
import { mainFetcher } from "../utils/AxiosInstances";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
        <main>{children}</main>
      </SWRConfig>
    </>
  );
};

export default Layout;
