import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Pages/adminPages/AdminLogin";
import AdminDashboard from "../Pages/adminPages/AdminDashboard";
import UserListPage from "../Pages/adminPages/UserListPage";
import OwnerListPage from "../Pages/adminPages/OwnerListPage";
import RoomListPage from "../Pages/adminPages/RoomListPage";
import BookingListPage from "../Pages/adminPages/BookingListPage";
import PageNotFound from "../Components/error/PageNotFound";

const AdminRoute = ()=>{
    return(
        <Routes>
            <Route path="/" element={<AdminLogin/>}/>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/userList" element={<UserListPage/>}/>
            <Route path="/ownerList" element={<OwnerListPage/>}/>
            <Route path="/roomList" element={<RoomListPage/>}/>
            <Route path="/bookings" element={<BookingListPage/>}/>
            <Route path="*" element={<PageNotFound/>}/>

        </Routes>
    )
}

export default AdminRoute
