import Layout from "../src/components/Layout";
import "../src/assets/css/global.css";
import { ThemeContextProvider } from "../src/contexts/ThemeContext";
import { AppProps } from "next/app";
import { UserContextProvider } from "../src/contexts/UserContext";

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
