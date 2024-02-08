import axios from "axios";


// const baseURL = "http://localhost:3001/";
const baseURL = "https://roomque-server.onrender.com/";
const userBaseURL = baseURL;
const ownerBaseURL = `${baseURL}owner`;
const adminBaseURL = `${baseURL}admin`;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 200000,
    timeoutErrorMessage: "Request timeout... Please try again!..",
  });
  return instance;
};

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.Autherization = `Bearer ${authToken}`;
  }
  return req;
};

// request interceptors

export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "userToken");
  return modifiedReq;
});

export const ownerAxiosInstance = createAxiosInstance(ownerBaseURL);
ownerAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "ownerToken");
  return modifiedReq;
});

export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "adminToken");
  return modifiedReq;
});


