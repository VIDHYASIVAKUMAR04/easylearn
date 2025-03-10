import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../resource/Footer";
import CoursueDashboard from "./courceDasboard";
import CourseHome from "../reuse/project/CourseHome";
import UserProfile from "../reuse/project/MyLearnings";
import Cart from "../reuse/project/Cart";


const Home = () => {

    return(
    <>
       <Routes>
        <Route path = "dashboard" element={<CoursueDashboard />} />
        <Route path="course/:courseId" element={<CourseHome />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="mylearnings" element={<UserProfile/>}/> 
      </Routes>
      <Footer/>
    
    </>
      
    );
}

export default Home;