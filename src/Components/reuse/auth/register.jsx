import React, { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, Lock, User, UserCheck, ArrowLeft, CheckCircle, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth,db } from "./firebase"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
  
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
  
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date(),
          uid: userCredential.user.uid
        });
  
        navigate("/app/dashboard");
        
      } catch (error) {
        let errorMessage = "Registration failed. Please try again.";
        
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email is already in use";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
        }
        
        setErrors({ form: errorMessage });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNavigateToLogin = () => {
        navigate ("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-2">
         
          <h1 className="text-xl font-bold text-gray-800">Create Account</h1>
        </div>

        <div className="text-center mb-2">
          <p className="text-gray-600">Join us today and get access to all features</p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md text-black focus:ring-2 focus:outline-none ${
                  errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md text-black focus:ring-2 focus:outline-none ${
                  errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border text-black rounded-md focus:ring-2 focus:outline-none ${
                  errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Password strength:</span>
                  <span className="text-xs font-medium" style={{color: passwordStrength <= 2 ? '#EF4444' : passwordStrength <= 3 ? '#F59E0B' : '#10B981'}}>
                    {getStrengthLabel()}
                  </span>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStrengthColor()}`} 
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center text-xs">
                    <CheckCircle size={12} className={formData.password.length >= 8 ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                    <span className={formData.password.length >= 8 ? "text-green-500" : "text-gray-500"}>
                      8+ characters
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <CheckCircle size={12} className={/[A-Z]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                    <span className={/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-500"}>
                      Uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <CheckCircle size={12} className={/[0-9]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                    <span className={/[0-9]/.test(formData.password) ? "text-green-500" : "text-gray-500"}>
                      Number
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <CheckCircle size={12} className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                    <span className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : "text-gray-500"}>
                      Special character
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border text-black rounded-md focus:ring-2 focus:outline-none ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <UserCheck size={18} className="mr-2" />
            )}
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleNavigateToLogin}
              className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center mx-auto mt-1"
            >
              <LogIn size={16} className="mr-1" />
              Sign in
            </button>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Register;