"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import HomeSlider from "./components/HomeSlider/HomeSlider";
import CategoriesSlider from "./components/Categories/CategoriesSlider";
import BlogSlider from "./components/Blogcards/BlogSlider";



export default function Home() {
  return (
    <main>
      <Navbar/>
      <HomeSlider/>
      <CategoriesSlider />
      <BlogSlider />
      <h1> ---- Footer ---- </h1>
    </main>
  );
}
