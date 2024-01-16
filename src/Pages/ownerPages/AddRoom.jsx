import React from 'react'
import OwnerNavbar from '../../Components/OwnerComponents/OwnerNavbar'
import OwnerFooter from '../../Components/OwnerComponents/OwnerFooter'
import AddRoomForm from '../../Components/OwnerComponents/AddRoomForm'

const AddRoom = () => {
  return (
    <div>
        <OwnerNavbar/>
        <AddRoomForm/>
        <OwnerFooter/>
    </div>
  )
}

export default AddRoom