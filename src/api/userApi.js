import { userAxiosInstance } from "./axiosInstance";

export const userSignup = async(signupData) =>{
    // console.log("heyy dataaa");
    const data = await userAxiosInstance.post("/signup", signupData)
    return data
};

export const otpVerification = async (otp, otpId, userId) =>{
    const data = await userAxiosInstance.post("/otp",{otp, userId});
    return data
}

export const clientResendOtp = async(userEmail) =>{
    // console.log(userEmail, "from userApi");
    const data = await userAxiosInstance.post("/resendOtp", {userEmail})
    return data
}

export const loginVerifcation = async(loginData) =>{
    const data = await userAxiosInstance.post("/login", loginData)
    return data
}

export const getRooms = async ()=>{
    const data = await userAxiosInstance.get("/");
    return data
}

export const getRoomDetails = async (roomId)=>{
    const data = await userAxiosInstance.get(`roomDetails/${roomId}`);
    return data
}

export const forgotPassword = async (email) => {
    const data = await userAxiosInstance.post("/fPassword",email)
    return data
}

export const verifyPasswordUser = async (password,userId) => {
    const data = await userAxiosInstance.patch("/verifyPasswordUser",{password,userId})
    return data
}

export const editProfile = async (userData)=>{
    const data = await userAxiosInstance.put("/editProfile",{...userData})
    return data
}

export const bookRoom = async(roomId,userId, date)=>{
    const data = await userAxiosInstance.post("/bookRoom",{roomId,userId, date})
    return data
}

export const myBookings = async(userId)=>{
    const data = await userAxiosInstance.get(`myBookings/${userId}`);
    return data
}

export const cancelBooking = async(bookId)=>{
    const data = await userAxiosInstance.post('/cancelBooking',{bookId})
    return data
}

export const searchLocation = async(value)=>{
    const data = await userAxiosInstance.post('/getLocationData',{value})
    return data
}

export const addRemoveWishlist = async(value)=>{
    const data = await userAxiosInstance.post('/changeWishlist',{value})
    return data
}

export const postRatingAndReview = async(roomId,userName, userId, selectedRating, review)=>{
    const data = await userAxiosInstance.post('/postReview',{roomId,userName, userId, selectedRating, review})
    return data
}

export const myRatings = async(userId)=>{
    const data = await userAxiosInstance.post('/myRatings',{userId})
    return data
}

export const paymentApi = async(roomDetails, date)=>{
    const data = userAxiosInstance.post('/paymentCheckout',{roomDetails, date})
    return data
}

export const getRating = async(roomId)=>{
    const data = userAxiosInstance.post('/getRatingsss',{roomId})
    return data
}

export const checkRoomAvailable = async(roomId, date)=>{
    const data = userAxiosInstance.post('/checkAvailable',{roomId, date})
    return data
}



  

