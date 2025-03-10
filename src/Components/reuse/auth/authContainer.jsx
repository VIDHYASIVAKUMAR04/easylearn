import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, LogIn, UserPlus, Menu, X, Award } from 'lucide-react';

const AuthLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Subtle background movement animation
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX / window.innerWidth) * 10;
    const moveY = (clientY / window.innerHeight) * 10;
    setBackgroundPosition(`${50 + moveX}% ${50 + moveY}%`);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div 
      className="relative flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-300 ease-in-out"
      onMouseMove={handleMouseMove}
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-3"
          >
            <Award size={28} className='text-black'/>
           <div>EasyLearn</div>
          </Link>

          {/* Desktop Search and Auth Buttons */}
         
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            <Link 
              to="/auth/login" 
              className="btn btn-outline btn-primary hover:scale-105 transition-transform duration-300 flex items-center"
            >
              <LogIn className="mr-2" size={18} />
              Sign In
            </Link>
            <Link 
              to="/auth/register" 
              className="btn btn-primary hover:scale-105 transition-transform duration-300 flex items-center"
            >
              <UserPlus className="mr-2" size={18} />
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
           
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                to="/auth/login" 
                className="btn btn-outline btn-primary flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <LogIn className="mr-2" size={18} />
                Sign In
              </Link>
              <Link 
                to="/auth/register" 
                className="btn btn-primary flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <UserPlus className="mr-2" size={18} />
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <div 
        className="flex-grow flex items-center justify-center pt-16 pb-5 relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://source.unsplash.com/random/1600x900?education")',
          backgroundPosition: backgroundPosition,
          backgroundSize: 'cover',
          transition: 'background-position 0.5s ease-out'
        }}
      >
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-500 hover:scale-105">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;