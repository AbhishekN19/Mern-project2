import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaCirclePlus } from "react-icons/fa6";
import Link from 'next/link';
import logo from '@/assets/logo.png'
import Image from 'next/image';
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar-left'>
          <Link href="/pages/profile">
          <CgProfile className='icon'/>
          </Link>
          <Link href="/pages/addblog">
          <FaCirclePlus className='icon'/>
          </Link>
          <Link href="/pages/search">
          <IoSearchSharp className='icon'/>
          </Link>
        </div>
        <div className='navbar-middle'>
        <Link href='/'>
          <Image className='logo'
                src={logo}
                alt="blog logo"
          />
        </Link>
        </div>
        <div className='navbar-right'>
          <Link href='/'>Home</Link>
          <Link href='/pages/about'>About</Link>
          <Link href='/pages/contact'>Contact</Link>
        </div>
    </nav>
  )
}

export default Navbar