"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar/Navbar";

export default function About() {
  return (
    <main>
      <Navbar/>
      <h1>This is About page</h1>
    </main>
  );
}
