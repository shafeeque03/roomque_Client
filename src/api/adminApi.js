import { adminAxiosInstance } from "./axiosInstance";

export const adminLoginVerify = async (loginData) => {
  const data = await adminAxiosInstance.post("/login", loginData);
  return data;
};

export const usersList = async () => {
  const data = await adminAxiosInstance.get("/users");
  return data;
};

export const userBlock = async (userId, status) => {
  const data = await adminAxiosInstance.patch("/blockUser", { userId, status });
  return data;
};

export const ownerList = async () => {
  const data = await adminAxiosInstance.get("/owners");
  return data;
};

export const ownerBlock = async (ownerId, status) => {
  const data = await adminAxiosInstance.patch("/blockOwners", { ownerId, status });
  return data;
};

export const roomList = async () => {
  const data = await adminAxiosInstance.get("/rooms");
  return data;
};

export const roomBlock = async (roomId, status) => {
  const data = await adminAxiosInstance.patch("/blockRoom", { roomId, status });
  return data;
};