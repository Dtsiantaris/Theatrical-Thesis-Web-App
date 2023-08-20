import Layout from "../src/components/Layout";
import "../src/assets/css/global.css";
import { ThemeContextProvider } from "../src/contexts/ThemeContext";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  );
}

export default MyApp;
