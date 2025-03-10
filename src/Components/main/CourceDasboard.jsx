import React, { useState, useEffect } from "react";
import { auth } from "../reuse/auth/firebase";
import { signOut } from "firebase/auth";
import {
  Search,
  Bell,
  Mail,
  User,
  Settings,
  LogOut,
  Home,
  Inbox,
  BookOpen,
  CheckSquare,
  Users,
  ChevronRight,
  Menu,
  X,
  Award,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import CourseList from "../reuse/project/CourseList";
import CartIcon from "../reuse/project/CartIcon.jsx";
import coursesData from "../reuse/json/detail.json";

const CoursueDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(4);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);

  const navigate = useNavigate();
  const data = localStorage.getItem("userCredentials");
  const user = JSON.parse(data);

  useEffect(() => {
    setAllCourses(coursesData.courses);
    setFilteredCourses(coursesData.courses);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCourses(allCourses);
      return;
    }
    const filtered = allCourses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
    setVisibleCourses(4);
  }, [searchQuery, allCourses]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const handleShowMore = () => {
    setVisibleCourses((prev) => prev + 4);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar} 
                className="p-2 mr-2 md:hidden"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                <Award size={28} />
                <span className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  EASYLEARN
                </span>
              </div>
            </div>

            <div className="hidden sm:block flex-grow max-w-lg mx-4">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="What Do You Want To Learn?...."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/app/mylearnings"
                className="group relative inline-flex items-center gap-1 px-3 md:px-6 py-2 md:py-3 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  <span className="text-sm md:text-base">My Learnings</span>
                </span>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                <span className="absolute bottom-0 left-0 h-1 w-full bg-blue-400 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
              <CartIcon />
            </div>
          </div>

          <div className="mt-3 sm:hidden">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                size={20}
              />
              <input
                type="text"
                placeholder="What Do You Want To Learn?...."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 z-40 h-screen bg-white w-62 border-r border-gray-100 p-4 md:block`}
        >
          <div className="flex justify-between items-center mb-6">
           <button className="md:hidden" onClick={toggleSidebar}>
            <div className="flex items-center gap-2">
              <Award size={30} />
              <span className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
                EASYLEARN
              </span>
            </div>
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <img
              src="https://res.cloudinary.com/dxutqk10a/image/upload/v1739552709/profile_21_ebnzfs.png"
              className="w-12 h-12 rounded-full border-2 border-blue-500 mr-3"
            />
            <h3 className="font-semibold mb-1">{user.email}</h3>
            <p className="text-xs text-center text-gray-500">
              Continue Your Journey And Achieve Your Target
            </p>

            <div className="flex justify-between w-full mt-4">
              <button className="p-2 rounded-full border border-gray-200">
                <Bell size={16} />
              </button>
              <button className="p-2 rounded-full border border-gray-200">
                <Mail size={16} />
              </button>
              <button className="p-2 rounded-full border border-gray-200">
                <User size={16} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-500 mb-4">
              OVERVIEW
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-blue-700 font-medium">
                <Home size={20} />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Inbox size={20} />
                <span>Inbox</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <BookOpen size={20} />
                <span>Lesson</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <CheckSquare size={20} />
                <span>Task</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Users size={20} />
                <span>Group</span>
              </li>
            </ul>
          </div>

          <div className="mt-auto pt-4">
            <div className="text-xs font-semibold text-gray-500 mb-4">
              SETTINGS
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-600">
                <Settings size={20} />
                <span>Settings</span>
              </li>
              <li>
                <button
                  className="flex items-center gap-3 text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {(sidebarOpen || leftSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => {
              setSidebarOpen(false);
              setLeftSidebarOpen(false);
            }}
          />
        )}

        <div className="flex-1 p-4 md:p-6 w-full">
          <div className="bg-blue-500 rounded-xl p-4 md:p-6 mb-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full bg-blue-400 opacity-60 -mr-10 -mb-10" />
            <div>
              <div className="text-md font-medium text-blue-100 mb-1">
                ONLINE COURSES
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Sharpen Your Skills With
                <br />
                EasyLearn Online Courses
              </h2>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                
                Join Now
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <CourseList
            courses={
              Array.isArray(filteredCourses)
                ? filteredCourses.slice(0, visibleCourses)
                : []
            }
            handleShowMore={handleShowMore}
            showMoreVisible={visibleCourses < filteredCourses.length}
          />

          <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center">
              <img
                src="https://res.cloudinary.com/dxutqk10a/image/upload/v1739552709/profile_21_ebnzfs.png"
                className="w-12 h-12 rounded-full border-2 border-blue-500 mr-3"
              />
              <div>
                <h3 className="font-semibold">{user.email}</h3>
                <p className="text-xs text-gray-500">Continue Your Journey</p>
              </div>
            </div>
            <button
              onClick={toggleLeftSidebar}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursueDashboard;