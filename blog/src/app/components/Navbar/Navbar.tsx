import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaCirclePlus } from "react-icons/fa6";
import Link from 'next/link';
import logo from '@/assets/logo.png'
import Image from 'next/image';
import './Navbar.css'
import {toast} from 'react-toastify';
import { deleteCookie} from 'cookies-next';

const Navbar = () => {

  const [auth, setauth]  = useState<Boolean>(false)
  const checkLogin = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      },
      credentials: 'include'
    })
    .then((res) => {
      return res.json();
    })
    .then((response)=> {
      if(response.ok) {
        setauth(true)
      }else {
        setauth(false)
      }
    })
    .catch((error) => {
      toast(error.message, {
        type:'error',
        position: 'top-right',
        autoClose: 2000
      })
    }) 
  }
   
  useEffect(() => {
    checkLogin();
  },[]);

  const handlelogout = async() => {
    await deleteCookie('authToken');
    await deleteCookie('refreshToken');
    window.location.href = 'pages/auth/login'
  }
  

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
        {
        auth ? 
        <div className='navbar-right'>
          <Link href='/'>Home</Link>
          <Link href='/pages/about'>About</Link>
          <Link href='/pages/contact'>Contact</Link>

          <button onClick={handlelogout}>
            Logout
          </button>
        </div>
          :
        <div className='navbar-right'>
          <Link href='/pages/auth/signin'>
          Login
          </Link>
          <Link href='/pages/auth/signup'>
          Sign up
          </Link>
        </div>

        }
    </nav>
  )
}

export default Navbar