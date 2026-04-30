"use client"
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  

  return (
    <nav className='bg-[#0a0027] text-white flex justify-between px-4 h-14 items-center'>
        <div className='font-bold text-xl text-amber-200'><a href="/">CRM Manager</a></div>
        <div className='flex space-x-4'>
            <a href="/" className='hover:text-amber-200'>Home</a>
            <a href="#" className='hover:text-amber-200'>Features</a>
            <a href="#" className='hover:text-amber-200'>Management</a>
            <a href="#" className='hover:text-amber-200'>Contact</a>
        </div>
    </nav>
  )
}

export default Navbar