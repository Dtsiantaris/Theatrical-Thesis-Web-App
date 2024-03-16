import axios from "axios";
import { toast } from "react-toastify";

export const baseURL =
  "https://theatricalapi.jollybay-0ad0b06b.germanywestcentral.azurecontainerapps.io/api";

export const mainAxios = axios.create({
  baseURL,
});

mainAxios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

mainAxios.interceptors.response.use(
  (response) => {
    // If the response comes from a POST or PUT request
    if (
      response.config.method === "post" ||
      response.config.method === "put" ||
      response.config.method === "delete"
    ) {
      // Display success toast notification
      toast.success("Operation successful!", { theme: "colored" });
    }
    // If a new token is provided in the response, update it in localStorage
    if (typeof window !== "undefined" && response.data.data?.access_token) {
      const token = response.data.data.access_token as string;
      const expires_in = response.data.data.expires_in as number;

      const expirationDate = new Date(Date.now() + expires_in);
      console.log("ACCESS_TOKEN", response.data);
      localStorage.setItem("authToken", token);
      localStorage.setItem("authTokenExpiration", expirationDate.toISOString());
    }
    return response;
  },
  (error) => {
    if (
      error.response.status === 409 &&
      error.response.data.errorCode === "_2FaEnabled"
    ) {
      // Handle the 409 error for two-factor authentication enabled
      const customError = new Error("Two-factor authentication is enabled.");
      customError.message = "twoFactorEnabled";
      return Promise.reject(customError);
    }
    // Handle errors globally and show a notification
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An unexpected error occurred";
    toast.error(
      <div style={{ color: "black" }}>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>Error: {message}</div>
        </div>
      </div>,
      {
        theme: "colored",
      }
    );
    return Promise.reject(error);
  }
);

const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API,
  },
});

const newsAxios = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: process.env.NEWS_API,
  },
});

export const newsFetcher = async (url: string) => {
  try {
    const response = await newsAxios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const mainFetcher = async (url: string) => {
  try {
    const response = await mainAxios.get(url);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const internalFetcher = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);

    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const internalFetcherGet = async (
  url: string,
  path: string,
  id: string
) => {
  try {
    const response = await axios.get(url, {
      params: {
        path,
        id,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const tmdbFetcher = async (url: string) => {
  try {
    const response = await tmdbAxios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
