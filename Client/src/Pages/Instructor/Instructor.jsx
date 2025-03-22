import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Instructor/Navbar'
import Sidebar from '../../Components/Instructor/Sidebar'
import Footer from '../../Components/Instructor/Footer'

const Instructor = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <div className='flex-1'>
          {<Outlet />}
          </div>  
        </div>
        <Footer />
    </div>
  )
}

export default Instructor