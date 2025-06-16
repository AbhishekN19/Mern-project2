"use client"
import React, {useState} from "react";
import Image from "next/image";
import styles from './page.module.css';
import '../auth.css';
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import {toast} from 'react-toastify';
import logo from '@/assets/BLOG.png';


export default function signin() {
  return (
    <div className="authout">
      <Navbar/>
        <div className="authin">
            <div className="left">

            </div>
            <div className="right">
                <form style={{
                    display:"flex",
                    flexDirection: 'column',
                }}>
                    <div className="forminput_cont">
                        <label>Email</label> 
                        <input type="email" placeholder="Enter Your Email" />
                    </div>
                    <div className="forminput_cont">
                        <label>Password</label> 
                        <input type="text" placeholder="Enter Your Password" />
                    </div>


                    <button type="submit" className="main_button">Login</button>

                    <p className="authlink">Don't have an account?   <Link href={"signup"}>Register</Link></p>
                </form>
            </div>
        </div>
    </div>
  );
}
