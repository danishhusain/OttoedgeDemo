import axios, { AxiosError, CancelToken } from "axios";
import { MMKV } from "react-native-mmkv";
import { APIS } from "./routes";
import { ExtendedApiErrorResponse } from "@models/ApiErrorResponse";
import { User } from "@models/User";
import { LocalStorage } from "@typings/global";
import { ThemeInterface } from "@redux/reducers/settings";
export const storage = new MMKV();

interface PostOptions {
  cancelToken?: any; // Adjust the type as per your requirements
}

const api = axios.create({
  baseURL: "https://dummyjson.com", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
});

const handleApiError = (error: ExtendedApiErrorResponse) => {
  console.log("here error", error);
  if (error.response) {
    switch (error.axiosError?.status) {
      case 401: {
        //handle your unauthorized error here
        return { ...error.response, error: error.message };
      }
      default: {
        if (error && error.response && !!error.response.data.error) {
          if (!error.message) {
            return {
              ...error.response,
              error: error.response.data.error || "Network Error",
            };
          }
          return error.response.data;
        } else {
          return { error: `${error.message}` };
        }
      }
    }
  } else {
    return { error: error.message };
  }
};

// Axios interceptor to add Authorization header before each request
api.interceptors.request.use((config) => {
  // Add the Authorization header if a token is present
  const userData = getItem("userData");
  if (!!userData) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

export const get = async (endpoint: APIS, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const post = async (
  endpoint: APIS,
  data = {},
  options?: PostOptions
) => {
  try {
    const response = await api.post(endpoint, data, options);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const put = async (endpoint: APIS, data = {}, options?: PostOptions) => {
  try {
    const response = await api.put(endpoint, data, options);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const remove = async (endpoint: APIS) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const setItem = (key: LocalStorage, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = (key: LocalStorage): User | null  => {
  const jsonUser = storage.getString(key);
  if (jsonUser) {
    try {
      const userObject: User = JSON.parse(jsonUser);
      return userObject;
    } catch (error) {
      console.log("Error parsing user data:", error);
      return null;
    }
  } else {
    console.log("No data found for the key:", key);
    return null;
  }
};

export const clearAllItem = () => {
  return storage.clearAll();
};













////////////////

//// Function to create the onQueryStarted logic
// export const createOnQueryStarted = async (queryFulfilled, apiName) => {

//   try {
//       const { data, meta } = await queryFulfilled
//       handleApiSuccess(meta, apiName);
//       console.log("createOnQueryStarted", queryFulfilled)

//   } catch (err) {
//       handleApiError(err, apiName);
//       console.log("createOnQueryStarted", queryFulfilled)

//   }
// };




// export const handleApiSuccess = (meta, api) => {
//   const { _bodyText, method } = meta?.request
//   const { ok, status, url } = meta?.response
//   console.log("handleApiSuccess:=> ", "\n", "ApiName:", api, "\n", "Body:", _bodyText, "\n", "Method:", method, "\n", "Ok:", ok, "\n", "Status:", status, "\n", "Url:", url)


//   if (status === 401) {
//       showToast("Unauthorized: ", status);
//   } else if (status === 500) {
//       showToast("Internal Server Error: Please try again later", status);
//   } else if (status === 404) {
//       showToast("Not Found", status);
//   } else {
//       showToast("An error occurred. Please try again later", status);
//   }
// };


// export const handleApiError = (err, api) => {
//   const { _bodyText, method } = err?.meta?.request
//   const { ok, status, url } = err?.meta?.response
//   console.log("handleApiError:=> ", "\n", "ApiName:", api, "\n", "Body:", _bodyText, "\n", "Method", method, "\n", "Ok", ok, "\n", "Status", status, "\n", "Url", url)


//   if (status === 401) {
//       showToast("Unauthorized: ", status);
//   } else if (status === 500) {
//       showToast("Internal Server Error: Please try again later", status);
//   } else if (status === 404) {
//       showToast("Not Found", status);
//   } else {
//       showToast("An error occurred. Please try again later", status);
//   }
// };