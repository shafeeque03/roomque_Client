import React from 'react'
import UserNavbar from '../../Components/UserComponents/UserNavbar'
import Profile from '../../Components/UserComponents/Profile'
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  return (
    <div>
        <UserNavbar/>
        <Profile/>
    </div>
  )
}

export default UserProfile