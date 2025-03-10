import React from "react";
import { Link } from "react-router-dom";
import { Clock, Star, BookOpen } from "lucide-react";

const CourseCard = ({ course }) => {
    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105">
            {/* Course Image */}
            <div className="relative w-full h-55">
                <img 
                    src={course.img_url} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                />
                {/* Duration Badge */}
                <div className="absolute top-2 right-2 bg-primary text-black px-3 py-1 rounded-full text-sm bg-slate-100">
                    {course.duration}
                </div>
            </div>

            {/* Course Details */}
            <div className="p-4 space-y-2">
                {/* Course Title */}
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2 h-15">
                    {course.title}
                </h2>

                {/* Course Meta Information */}
                <div className="flex justify-between items-center">
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <Star className="text-green-500" size={20} />
                        <span className="text-gray-700 font-semibold">
                            {course.rating.toFixed(1)}
                        </span>
                    </div>

                    {/* Course Level */}
                    <div className="flex items-center space-x-2">
                        <BookOpen className="text-gray-500" size={18} />
                        <span className="text-gray-600 text-sm">
                            
                        </span>
                    </div>
                </div>

                {/* View Course Button */}
                <Link 
                    to={`/app/course/${course.course_id}`} 
                    className="btn btn-primary bg-blue-500 px-2 py-1 rounded-md text-white mt-3"
                >
                    View Course
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;