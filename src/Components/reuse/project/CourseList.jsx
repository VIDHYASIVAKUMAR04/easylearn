// CourseList.jsx
import React from "react";
import CourseCard from "./CourseCard";
import { ChevronRight } from "lucide-react";

const CourseList = ({ courses, handleShowMore, showMoreVisible }) => {
  return (
    <div className="container mx-auto px-1 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard 
            key={course.course_id} 
            course={course} 
          />
        ))}
      </div>

      {showMoreVisible && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleShowMore}
            className="bg-blue-700 text-white px-5 py-2 rounded-lg text-md font-medium flex items-center gap-2"
          >
            Show More Courses
            <ChevronRight 
              className="ml-2 transition-transform group-hover:translate-x-1" 
              size={24} 
            />
          </button>
        </div>
      )}

      {courses.length === 0 && (
        <div className="text-center text-xl mt-8 text-gray-700">
          No courses found matching your search
        </div>
      )}
    </div>
  );
};

export default CourseList;