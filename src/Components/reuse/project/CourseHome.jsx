import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "../json/detail.json";
import CartIcon from "./CartIcon";
import { Award } from "lucide-react";

const CourseHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [cartItems, setCartItems] = useState([]);
  const { courseId } = useParams();
  const course = coursesData.courses.find((c) => c.course_id === courseId);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const addToCart = (course) => {
    const updatedCart = [...cartItems, course];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleClick = () => {
    const courseToAdd = { ...course };
    addToCart(courseToAdd);
    setShowNotification(true);
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header/Navigation */}
        <div className="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
                <Award size={28} />
                <span className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  EASYLEARN
                </span>
              </div>
            <div className="ml-4 flex items-center space-x-1 text-sm">
              <span className="text-gray-500">Courses</span>
              <span className="text-gray-500">/</span>
              <span>{course.title}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <CartIcon />
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              {/* <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                {user.name.split(' ')[0][0]}
              </div>
              <span className="text-sm">{user.name}</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Course Header */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="flex items-center mb-1">
              <button
                className="text-gray-500 mr-2 cursor-pointer"
                onClick={() => navigate("/app/dashboard")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">{course.title}</h1>
            </div>
            <div className="text-sm text-gray-500 mb-4">{course.category}</div>

            <div className="flex items-center space-x-3 text-sm mb-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>{course.lessons} lessons</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>
                  {course.rating} ({course.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Course Video Banner */}
            <div className="relative rounded-lg overflow-hidden bg-black mb-4 h-96">
  <img
    src={course.img_url}
    alt={course.title}
    className="w-full h-full"
  ></img>
</div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-2 px-1 text-sm font-medium ${
                    activeTab === "overview"
                      ? "text-indigo-600 bg-slate-300 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("author")}
                  className={`py-2 px-1 text-sm font-medium ${
                    activeTab === "author"
                      ? "text-indigo-600 bg-slate-300 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Author
                </button>
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`py-2 px-1 text-sm font-medium ${
                    activeTab === "faq"
                      ? "text-indigo-600 bg-slate-300 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => setActiveTab("announcements")}
                  className={`py-2 px-1 text-sm font-medium ${
                    activeTab === "announcements"
                      ? "text-indigo-600 bg-slate-300 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Announcements
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-2 px-1 text-sm font-medium ${
                    activeTab === "reviews"
                      ? "text-indigo-600 bg-slate-300 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            <h2 className="text-xl font-bold mb-4">About Course</h2>

            <div className="py-6">
              {activeTab === "overview" && (
                <div>
                  <p className="mb-6">{course.description.about}</p>
                  <p className="mb-6">{course.description.forWhom}</p>

                  <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {activeTab === "author" && (
              <div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src="https://res.cloudinary.com/dxutqk10a/image/upload/v1741187564/c16_gjameb.jpg"
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium">
                        {course.instructor.name}
                      </h3>
                      {course.instructor.verified && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {course.instructor.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="ml-1 text-sm">
                        {course.instructor.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  Crystal is a seasoned UI/UX designer with over a decade of
                  experience working with leading tech companies. Her expertise
                  in Figma has helped hundreds of students transition into
                  successful design careers.
                </p>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">
                    Do I need prior experience with design tools?
                  </h3>
                  <p className="text-gray-700">
                    No, this course is designed for beginners as well as
                    experienced designers looking to master Figma.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">
                    Will I receive a certificate upon completion?
                  </h3>
                  <p className="text-gray-700">
                    Yes, you'll receive a downloadable certificate that you can
                    add to your portfolio or LinkedIn profile.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">
                    How long do I have access to the course materials?
                  </h3>
                  <p className="text-gray-700">
                    You'll have lifetime access to all course materials,
                    including any future updates.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "announcements" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Course Announcements</h2>
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">
                      New module added: Advanced Prototyping
                    </h3>
                    <span className="text-sm text-gray-500">March 1, 2025</span>
                  </div>
                  <p className="text-gray-700">
                    We've added a bonus module covering advanced prototyping
                    techniques in Figma. Check it out in section 8!
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Live Q&A Session Next Week</h3>
                    <span className="text-sm text-gray-500">
                      February 20, 2025
                    </span>
                  </div>
                  <p className="text-gray-700">
                    Join us for a live Q&A session with instructor Crystal on
                    March 15th at 2 PM EST. Bring your Figma questions!
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Student Reviews</h2>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">
                      {course.rating}
                    </div>
                    <div>
                      <div className="flex text-yellow-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21l-7-7" />
                        </svg>
                      </div>
                      <div className="text-sm text-gray-500">
                        {course.reviews} reviews
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Sample review */}
                  <div className="border-b pb-6">
                    <div className="flex items-start">
                      <img
                        src="https://res.cloudinary.com/dxutqk10a/image/upload/v1741187596/c17_oeucsd.jpg"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium mr-2">Michael P.</h3>
                          <div className="flex text-yellow-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          February 28, 2025
                        </p>
                        <p>
                          This course completely transformed my design workflow.
                          Crystal explains complex concepts in an
                          easy-to-understand way, and the hands-on projects
                          helped me build my portfolio while learning.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Another review */}
                  <div className="border-b pb-6">
                    <div className="flex items-start">
                      <img
                        src="https://res.cloudinary.com/dxutqk10a/image/upload/v1741187564/c16_gjameb.jpg"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium mr-2">Sarah J.</h3>
                          <div className="flex text-yellow-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          February 15, 2025
                        </p>
                        <p>
                          I've taken many design courses, but this is by far the
                          most comprehensive guide to Figma available online.
                          The section on components and design systems was
                          particularly valuable for my work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="sticky top-6">
              <div className="bg-white border rounded-lg overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Course content</h2>

                  <div className="space-y-3">
                    {course.modules.map((module) => (
                      <div key={module.id} className="border rounded-lg">
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500">
                              {module.id}
                            </span>
                            <span className="font-medium">{module.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {module.duration}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 transform transition-transform ${
                                module.expanded ? "rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </button>

                        {module.expanded && module.lessons && (
                          <div className="p-4 pt-0">
                            <div className="space-y-2">
                              {module.lessons.map((lesson, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <div className="flex items-center space-x-3">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-gray-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                      />
                                    </svg>
                                    <span>{lesson.title}</span>
                                  </div>
                                  <span className="text-gray-500">
                                    {lesson.duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="relative">
      {/* Course Enrollment Card */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Enroll in Course</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">${course.price}</span>
          <span className="text-sm text-gray-500 line-through">
            ${course.discount}
          </span>
        </div>
        <button
          onClick={handleClick}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Add To Cart!
        </button>
        <p className="text-sm text-gray-500 mt-2 text-center">
          30-Day Money-Back Guarantee
        </p>
      </div>

      {/* Toast Notification - using DaisyUI toast component */}
      {showNotification && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success shadow-lg">
            <div className="flex items-center bg-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Course added to cart successfully!</span>
            </div>
          </div>
        </div>
      )}

      {/* Alternative implementation with fixed positioning */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="alert alert-success bg-green-400  shadow-lg flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Course "{course.title}" added to cart!</span>
            <button onClick={() => setShowNotification(false)} className="ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;
