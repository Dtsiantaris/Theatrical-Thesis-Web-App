import axios from "axios";

// local server
// export const mainAxios = axios.create({
//     baseURL: process.env.NODE_ENV === "development" ? "http://192.168.2.14:5000/api" : "http://46.177.145.22:53239/api"
// })

export const baseURL = "http://195.251.123.174:8080/api";
//export const baseURL = "https://theatricalportal.azurewebsites.net/api";
// export const baseURL = "https://theatricalportalv2.azurewebsites.net/api/";
// export const baseURL = "https://0.0.0.0:7042/api";
// export const baseURL = "http://127.0.0.1:7042/api";
// export const baseURL = "http://localhost:7042/api";

export const mainAxios = axios.create({
  baseURL,
});

mainAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
  };

  return config;
});

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
