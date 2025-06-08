import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar/Navbar";
import "./addblog.css"
export default function AddBlog() {
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
            <label>Blog Description</label> 
            <textarea placeholder="Enter the Blog Description " />
        </div>
        <div className="forminput_cont">
          <label>Blog Image</label>
          <input type="file"/>
        </div>
        <div className="paragraph">
          <div className="forminput_cont">
            <label>Paragraph Title</label>
            <input type="text" placeholder="Enter Paragraph Title" />
          </div>
          <div className="forminput_cont">
            <label>Paragraph Description</label>
            <textarea placeholder="Enter Paragraph Description" />
          </div>
          <div className="forminput_cont">
            <label>Paragraph Image</label>
            <input type="file" />
          </div>

          <button type="submit" className="main_button">Add More Paragraphs</button>
        </div>

          <button type="submit" className="main_button">Submit</button>

      </form>
    </div>
  );
}
