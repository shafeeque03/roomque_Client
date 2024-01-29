import React from 'react'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import BookingList from '../../Components/AdminComponents/BookingList'

const BookingListPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className="mx-auto flex bg-gray-200">
        <AdminSidebar/>
        <BookingList/>
        </div>
    </div>
  )
}

export default BookingListPage