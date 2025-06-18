"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar/Navbar";
import "./addblog.css"
import { useEffect, useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { getCookie, setCookie } from "cookies-next";
import { error, log } from "console";

interface ParagraphData {
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;  
  position: string;
  createdAt: Number | null;
}
interface FormData {
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  paragraphs: ParagraphData[];
  category: string;
}

export default function AddBlog() {
let [loading, setLoading] = useState(false);

  const checkLogin = async() => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
        method: 'GET',
        headers:{
          'Content-Type' : 'application/json',
        },
        credentials: 'include'
      })
      .then((res) => {
        return res.json();
      })
      .then((response)=> {
        console.log(response);
        if(response.ok) {

        }else {
          window.location.href = "/pages/auth/signin"
        }
      })
      .catch((error) => {
        console.log(error);
        
        window.location.href = "/pages/auth/signin"
      })
  };

  useEffect(()=> {
    checkLogin();
  },[]);

  const [blog, setBlog] = useState<FormData>({
    title:'',
    description:'',
    image: null,
    imageUrl: '',
    paragraphs: [],
    category:'',
  });

  const [categories, setCategories] = useState<string[]>([])

  const getCategories = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogcategories`)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      setCategories(response.categories)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  const [paragraphForm, setParagraphForm] = useState<ParagraphData>({
    title:'',
    description:'',
    image: null,
    imageUrl:'',
    position:'',
    createdAt: null
  })

  const pushParagraphToBlog = () => {
    let tempPg = paragraphForm
    tempPg.createdAt = new Date().getTime();
    setBlog({
      ...blog,
      paragraphs: [
        ...blog.paragraphs, paragraphForm
      ]
    })
    let nextPosition = String(parseInt(paragraphForm.position)+1);
    setParagraphForm({
      ...paragraphForm,
      title: '',
      description:'',
      position: nextPosition,
      createdAt: null
    })
  }
useEffect(() =>{
  console.log(blog)
},[blog])

  const deleteParagraph = (paragraph: ParagraphData) =>{

  }



  return (
    <div className="addblog_in">
      <Navbar/>
      <h1 className="head1">This is Add blog page</h1>
      <form style= {{
        width: '70%',
        minWidth:'250px',
        display:'flex',
        flexDirection:'column',
      }}>
        <div className="forminput_cont">
            <label>Blog Name</label> 
            <input type="text" placeholder="Enter the Blog title" />
        </div>

        <div className="forminput_cont">
            <label>Blog Category</label> 
            <select 
            value={blog.category}
            onChange={(e) => setBlog({ ...blog, category: e.target.value})} 
            >
              <option value = "" > Select a category</option>
              {categories.map((category) => (
                <option key={category} value = {category} >
                  {category}
                </option>
              ))}
            </select>
        </div>
        

        <div className="forminput_cont">
            <label>Blog Description</label> 
            <textarea placeholder="Enter the Blog Description " />
        </div>
        <div className="forminput_cont">
          <label>Blog Image</label>
          <input type="file"/>
        </div>


        <div className="paragraph">
          <div className="forminput_cont">
            <label>Paragraph Position</label>
            <input 
            type="number" 
            value={paragraphForm.position}
            placeholder="Enter paragraph Position"
            onChange={(e) => 
              setParagraphForm ({ ...paragraphForm, position: e.target.value})
            }/>
          </div>

          <div className="forminput_cont">
            <label>Paragraph Title</label>
            <input type="text" value={paragraphForm.title} placeholder = "Enter paragraph Title" 
            onChange= {(e) => setParagraphForm({...paragraphForm, title: e.target.value})}/>
          </div>

          <div className="forminput_cont">
            <label>Paragraph Description</label>
            <textarea placeholder="Enter Paragraph Description"
            value={paragraphForm.description}
            onChange= {(e) => setParagraphForm({...paragraphForm, description: e.target.value})} />
          </div>


          <div className="forminput_cont">
            <label>Paragraph Image</label>
            <input type="file" 
            id='pgimg'
            onChange={(e) => {
              const selectedImage = e.target.files?.[0];
              if(selectedImage) {
                setParagraphForm( { ...paragraphForm, image: selectedImage});
              }
            }}
            />

            <button type="button" className="main_button" onClick={(e) => {
              e.preventDefault();
              pushParagraphToBlog();
            }}>Add Paragraph to Blog</button>
          </div>

        </div>

          <button type="submit" className="main_button">Submit</button>

      </form>
    </div>
  );
}
