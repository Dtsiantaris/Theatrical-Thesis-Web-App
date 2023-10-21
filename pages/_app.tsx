import Layout from "../src/components/Layout";
import "../src/assets/css/global.css";
import { ThemeContextProvider } from "../src/contexts/ThemeContext";
import { AppProps } from "next/app";
import { UserContextProvider } from "../src/contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
