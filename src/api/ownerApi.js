import { ownerAxiosInstance } from "./axiosInstance";

export const ownerSignup = async (signupData) => {
  const data = await ownerAxiosInstance.post("/signup", signupData);
  return data;
};

export const ownerOtpVerification = async (otp, otpId, ownerId) => {
  const data = await ownerAxiosInstance.post("/otp", { otp, ownerId });
  return data;
};

export const ownerResendOtp = async (ownerEmail) => {
  const data = await ownerAxiosInstance.post("/resendOtp", { ownerEmail });
  return data;
};

export const ownerLoginVerifcation = async (loginData) => {
  const data = await ownerAxiosInstance.post("/login", loginData);
  return data;
};

export const addRoom = async (roomFormData, roomImage, location) => {
  console.log("add room call from api");
  const data = await ownerAxiosInstance.post(
    "/addRoom",
    { ...roomFormData },
    roomImage,
    location
  );
  return data;
};

export const myRoomList = async (ownerId) => {
  const data = await ownerAxiosInstance.get(`/${ownerId}`);
  return data;
};
export const editRoom = async (formData) => {
  console.log("call from edit api");
  const data = await ownerAxiosInstance.put("/editRoom", { ...formData });
  return data;
};

export const deleteRoom = async (roomId) => {
  const data = await ownerAxiosInstance.post("/deleteRoom", roomId);
  return data;
};

export const deleteSingleImage = async (imageUrl, roomId) => {
  const data = await ownerAxiosInstance.patch("/deleteImage", {
    imageUrl,
    roomId,
  });
  return data;
};

export const myRoom = async (roomId) => {
  const data = await ownerAxiosInstance.get(`myRoom/${roomId}`);
  return data;
};

export const roomBlock = async (roomId, status) => {
  const data = await ownerAxiosInstance.patch("/blockRoom", { roomId, status });
  return data;
};

export const forgotPassword = async (email) => {
  const data = await ownerAxiosInstance.post("/forgotPassword", email);
  return data;
};

export const verifyPassword = async (password, ownerId) => {
  const data = await ownerAxiosInstance.patch("/verifyPassword", {
    password,
    ownerId,
  });
  return data;
};

export const bookingss = async (ownerId) => {
  const data = await ownerAxiosInstance.get(`myBookings/${ownerId}`);
  return data;
};

export const OwnereditProfile = async (ownerData) => {
  const data = await ownerAxiosInstance.put("/editProfile", { ...ownerData });
  return data;
};

export const checkedIn = async (bookId) => {
  const data = ownerAxiosInstance.post("/checkedIn", { bookId });
  return data;
};
