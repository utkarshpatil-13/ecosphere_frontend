import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
  )
}

export default Layout