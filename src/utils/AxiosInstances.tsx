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
    // console.log("response print interceptor", response);
    if (typeof window !== "undefined" && response.data.data.access_token) {
      const token = response.data.data.access_token;
      localStorage.setItem("authToken", token);
    }
    return response;
  },
  (error) => {
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
          {/* <EmailIcon style={{ marginRight: "10px" }} /> */}
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
  console.log("MAIN FETCHER CALLED!!!!!!!!!", url);
  try {
    const response = await mainAxios.get(url);
    console.log("AXIOS RESPONSE: ", response);
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
