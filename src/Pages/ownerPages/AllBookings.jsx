import React from 'react'
import OwnerFooter from '../../Components/OwnerComponents/OwnerFooter'
import OwnerNavbar from '../../Components/OwnerComponents/OwnerNavbar'
import RoomBookings from '../../Components/OwnerComponents/RoomBookings'

const AllBookings = () => {
  return (
    <div>
        <OwnerNavbar/>
        <RoomBookings/>
        <OwnerFooter/>
    </div>
  )
}

export default AllBookings