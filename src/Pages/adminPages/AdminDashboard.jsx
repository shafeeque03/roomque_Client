import React from 'react'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import DashboardCard from '../../Components/AdminComponents/DashboardCard'

const AdminDashboard = () => {
    const users = "Users"
    const owners = "Owners"
  return (
    <div>
        <AdminNavbar/>
        <div class="mx-auto flex mt-5 bg-gray-200">
        <AdminSidebar />
        <div className='flex flex-wrap justify-evenly bg-slate-50'>
        <DashboardCard value={users}/>
        <DashboardCard value={owners}/>
        <DashboardCard value={owners}/>
        <DashboardCard value={owners}/>
        <DashboardCard value={owners}/>
        <DashboardCard value={owners}/>
        </div>
        
        
      </div>
    </div>
  )
}

export default AdminDashboard