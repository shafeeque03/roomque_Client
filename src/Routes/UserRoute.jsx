import { Routes, Route } from "react-router-dom";
import UserSignup from "../Pages/userPages/UserSignup";
import UserLogin from "../Pages/userPages/UserLogin";
import OtpUser from "../Pages/userPages/OtpUser";
import UserHome from "../Pages/userPages/UserHome";
import RoomDetails from "../Pages/userPages/RoomDetails";
import UserProtect from "./userPrivate/UserProtect";
import UserPublic from "./userPrivate/UserPublic";
import FpUser from "../Pages/userPages/FpUser";
import FOtpUser from "../Pages/userPages/FOtpUser";
import SetNewPassword from "../Pages/userPages/SetNewPassword";
import LazyLoadedRoomDetails from "../Pages/userPages/LazyLoadedRoomDetails";
import DummyHome from "../Components/UserComponents/DummyHome";
import UserProfile from "../Pages/userPages/UserProfile";
import { MyBookings } from "../Pages/userPages/MyBookings";

const UserRoute = ()=>{
    return(
        <Routes>

            <Route path="/" element={<UserHome/>}/>
            <Route path="/signup" element={<UserPublic><UserSignup/></UserPublic>}/>
            <Route path="/login" element={<UserPublic><UserLogin/></UserPublic>}/>
            <Route path="/otp" element={<UserPublic><OtpUser/></UserPublic>}/>
            <Route path="/roomDetails/:roomId" element={<UserProtect><LazyLoadedRoomDetails/></UserProtect>}/>
            <Route path="/profile" element={<UserProtect><UserProfile/></UserProtect>}/>
            <Route path="/bookings" element={<UserProtect><MyBookings/></UserProtect>}/>
            <Route path="/forgotPassword" element={<UserPublic><FpUser/></UserPublic>}/>
            <Route path="/fOtpUser" element={<UserPublic><FOtpUser/></UserPublic>}/>
            <Route path="/contact" element={<UserPublic><DummyHome/></UserPublic>}/>
            <Route path="/newPassword" element={<UserPublic><SetNewPassword/></UserPublic>}/>



        </Routes>
    )
}

export default UserRoute