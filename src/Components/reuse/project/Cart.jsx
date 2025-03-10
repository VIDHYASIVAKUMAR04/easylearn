import React, { useState, useEffect } from "react";
import { ShoppingCart, ArrowRight, Book, Clock, Star, Award ,ChevronLeft} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const navigate = useNavigate();
  // Add event listener for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    // Listen to storage events
    window.addEventListener('storage', handleStorageChange);

    // Initial load
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Add useEffect to load cart items on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Load featured course for empty cart state
    const goProgrammingCourse = {
      course_id: "go-programming-101",
      title: "Go Programming",
      img_url: "https://res.cloudinary.com/dxutqk10a/image/upload/v1741187673/c20_hqcvkt.jpg",
      category: "Programming",
      lessons: 30,
      duration: "4h 30min",
      rating: 4.6,
      price: 99.99,
      discount: 149.99,
      reviews: 189,
      instructor: {
        name: "Noah Garcia",
        title: "Software Engineer",
        rating: 4.7,
        verified: true
      }
    };
    
    setFeaturedCourse(goProgrammingCourse);
  }, []);

  const removeFromCart = (courseId) => {
    const updatedCart = cartItems.filter((item) => item.course_id !== courseId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (course) => {
    const updatedCart = [...cartItems, course];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-full bg-white px-4 py-8">
      <Link to="/app/dashboard" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center"><ChevronLeft size={24}/><p className=""> Back</p></Link>
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left mt-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any courses to your cart yet. Explore our catalog to find courses that match your learning goals.
            </p>
            
            {featuredCourse && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-xl font-semibold mb-4">Recommended for you</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <img 
                        src={featuredCourse.img_url} 
                        alt={featuredCourse.title} 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-2/3 flex flex-col justify-between">
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {featuredCourse.category}
                        </span>
                        <h4 className="text-lg font-semibold mt-2">{featuredCourse.title}</h4>
                        
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Book size={16} className="mr-1" />
                          <span className="mr-3">{featuredCourse.lessons} lessons</span>
                          <Clock size={16} className="mr-1" />
                          <span>{featuredCourse.duration}</span>
                        </div>
                        
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{featuredCourse.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-sm text-gray-600">{featuredCourse.reviews} reviews</span>
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <span className="text-lg font-bold">${featuredCourse.price}</span>
                          {featuredCourse.discount && (
                            <span className="ml-2 text-gray-500 line-through text-sm">
                              ${featuredCourse.discount}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(featuredCourse)} 
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <button onClick={() => navigate("/app/dashboard")} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center">
              Browse Courses <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="flex justify-center mb-3">
                <Book size={32} className="text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Extensive Library</h3>
              <p className="text-gray-600 text-sm">
                Access thousands of courses across different categories to enhance your skills
              </p>
            </div>
            <div className="text-center p-4">
              <div className="flex justify-center mb-3">
                <Clock size={32} className="text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Learn at Your Pace</h3>
              <p className="text-gray-600 text-sm">
                All courses come with lifetime access so you can learn whenever it suits you
              </p>
            </div>
            <div className="text-center p-4">
              <div className="flex justify-center mb-3">
                <Award size={32} className="text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600 text-sm">
                Learn from industry professionals with real-world experience and knowledge
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col">
            {cartItems.map((course) => (
              <div key={course.course_id} className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <img 
                    src={course.img_url || "/api/placeholder/80/80"} 
                    alt={course.title} 
                    className="w-20 h-20 object-cover rounded-md mr-4 mb-2 md:mb-0"
                  />
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-600">By {course.instructor?.name || "Unknown Instructor"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto mt-3 md:mt-0">
                  <span className="font-bold text-lg">${course.price?.toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(course.course_id)}
                    className="ml-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold">
                  ${cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
                </span>
              </div>
              <button className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;