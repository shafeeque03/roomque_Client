import { Route, Routes } from "react-router-dom";
import OwnerSignup from "../Pages/ownerPages/OwnerSignup";
import OtpOwner from "../Pages/ownerPages/OtpOwner";
import OwnerLogin from "../Pages/ownerPages/OwnerLogin";
import OwnerPublic from "./ownerPrivate/OwnerPublic";
import OwnerProtect from "./ownerPrivate/OwnerProtect";
import OwnerHome from "../Pages/ownerPages/OwnerHome";
import AddRoom from "../Pages/ownerPages/AddRoom";
import OwnerForgotPassword from "../Pages/ownerPages/ForgotPassword";
import RoomDetailsWiithEdit from "../Pages/ownerPages/RoomDetailsWiithEdit";
import Fotp from "../Pages/ownerPages/Fotp";
import NewPassword from "../Pages/ownerPages/NewPassword";
import AllBookings from "../Pages/ownerPages/AllBookings";
import OwnerProfilePage from "../Pages/ownerPages/OwnerProfilePage";

const OwnerRoute = ()=>{
    return(
        <Routes>
            <Route path="/signup" element={<OwnerPublic><OwnerSignup/></OwnerPublic>}/>
            <Route path="/otp" element={<OwnerPublic><OtpOwner/></OwnerPublic>}/>
            <Route path="/login" element={<OwnerPublic><OwnerLogin/></OwnerPublic>}/>
            <Route path="/" element={<OwnerProtect><OwnerHome/></OwnerProtect>}/>
            <Route path="/addRoom" element={<OwnerProtect><AddRoom/></OwnerProtect>}/>
            <Route path="/bookings" element={<OwnerProtect><AllBookings/></OwnerProtect>}/>
            <Route path="/details" element={<OwnerProtect><RoomDetailsWiithEdit/></OwnerProtect>}/>
            <Route path="/profile" element={<OwnerProtect><OwnerProfilePage/></OwnerProtect>}/>
            <Route path="/forgotPassword" element={<OwnerForgotPassword/>}/>
            <Route path="/fOtp" element={<OwnerPublic><Fotp/></OwnerPublic>}/>
            <Route path="/newPassword" element={<OwnerPublic><NewPassword/></OwnerPublic>}/>
            
        </Routes>
    )
}

export default OwnerRoute