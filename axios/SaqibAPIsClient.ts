import { toast } from "react-toastify";
import axios, { AxiosError, AxiosResponse } from "axios";
import Error from "next/error";
import { ErrorDetail } from "@/models/ErrorDetail";

export const SaqibAPIsClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEB_API_BASE_URL,
});

export const errorHandler = (error: AxiosError) => {
  try {
    var errorDetail = error.response?.data as ErrorDetail;
    toast.error(errorDetail.Message, {
      autoClose: false,
      closeOnClick: true,
    });
  } catch (error: any) {
    // console.log(error);
    toast.error("Cannot connect to web API.", {
      autoClose: false,
      closeOnClick: true,
    });
  }
};

// Add a request interceptor
SaqibAPIsClient.interceptors.request.use(
  async (config) => {
    // config.headers["Access-Control-Allow-Credentials"] = "true";
    // config.headers["Access-Control-Allow-Headers"] =
    //   "Origin, Authorization, Accept, Content-Type, X_API_KEY";
    // config.headers["Access-Control-Allow-Origin"] = process.env.NEXT_PUBLIC_NEXTJS_APP_BASE_URL;
    config.headers["X_API_KEY"] = "353419f8-44c3-43fc-9be4-1d564c225511";

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
SaqibAPIsClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    errorHandler(error);
    return Promise.reject(error);
  }
);
