import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EasyLearn</h3>
            <p className="text-gray-400">
              Online learning platform with thousands of courses taught by expert instructors.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Web Development</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Data Science</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Mobile Development</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Cloud Computing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 6c-1.08 0-2.1.27-3 3.61V7h-3v10h3v-3.39c.9 2.16 2.61 3.39 4.39 3.39 3.52 0 6.39-2.87 6.39-6.39 0-3.52-2.87-6.39-6.39-6.39zM8 8H5V18h3V8zm-1.5-3A1.5 1.5 0 116.5 3a1.5 1.5 0 010 3z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C7.58 2 4 5.58 4 10c0 3.31 2.12 6.19 5 7.41V22h6v-4.59c2.88-1.22 5-4.1 5-7.41 0-4.42-3.58-8-8-8zm0 10a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} EasyLearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;