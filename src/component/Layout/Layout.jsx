import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return<>
  <Navbar/>
  <div className="container mx-auto my-6 py-10">
    
  <Outlet></Outlet>
  </div>
  </>
}
