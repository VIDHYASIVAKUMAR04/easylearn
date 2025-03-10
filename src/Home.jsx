import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/resource/Footer";
import CoursueDashboard from "./Components/main/CourceDasboard";
import CourseHome from "./Components/reuse/project/CourseHome";
import UserProfile from "./Components/reuse/project/MyLearnings";
import Cart from "./Components/reuse/project/Cart";


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