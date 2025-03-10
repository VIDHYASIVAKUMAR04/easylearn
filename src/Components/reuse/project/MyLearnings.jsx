import React, { useState,useEffect } from 'react';
import { Award,ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
const EasyLearnDashboard = () => {
  const courses = [
    {
      id: 1,
      title: 'How to grow your Facebook Page',
      icon: '📊',
      progress: 12,
      status: 'Enrolled',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
    },
    {
      id: 2,
      title: 'Grow your Community',
      icon: '🔄',
      progress: 7,
      status: 'Enrolled',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100',
    },
    {
      id: 3,
      title: 'Data Science Bootcamp',
      icon: '📈',
      progress: 17,
      status: 'Full',
      color: 'bg-yellow-400',
      lightColor: 'bg-yellow-100',
    },
    {
      id: 4,
      title: 'Target Audience Training',
      icon: '🎯',
      progress: 21,
      status: 'Full',
      color: 'bg-red-400',
      lightColor: 'bg-red-100',
    },
  ];

  const myLearning = [
    {
      id: 1,
      title: 'Target Audience Training',
      description: 'Save time and make your business more effective by promoting...',
      progress: 53,
      icon: '🎯',
      color: 'text-red-500',
    },
    {
      id: 2,
      title: 'The Complete Web...',
      description: 'Learn Web Development by building 25 websites...',
      progress: 75,
      icon: '💻',
      color: 'text-blue-500',
    },
    {
      id: 3,
      title: 'Grow your Community',
      description: 'Follow these easy and simple steps',
      progress: 14,
      icon: '🔄',
      color: 'text-purple-500',
    },
  ];
    const [user, setUser] = useState(null);
  useEffect(() => {
       localStorage.getItem('userCredentials') && setUser(JSON.parse(localStorage.getItem('userCredentials')));
  }, []);

  // User performance data for the pie chart
  const performanceData = [
    { name: 'Completed', value: 65, color: '#3B82F6' },
    { name: 'In Progress', value: 25, color: '#10B981' },
    { name: 'Not Started', value: 10, color: '#6B7280' },
  ];

  const PieChart = ({ data }) => {
    let cumulativePercent = 0;

    const createPieSlice = (dataPoint, index) => {
      const startPercent = cumulativePercent;
      const slicePercent = dataPoint.value;
      cumulativePercent += slicePercent;

      const x1 = Math.cos(2 * Math.PI * startPercent / 100);
      const y1 = Math.sin(2 * Math.PI * startPercent / 100);
      const x2 = Math.cos(2 * Math.PI * cumulativePercent / 100);
      const y2 = Math.sin(2 * Math.PI * cumulativePercent / 100);

      // Determine if the slice is more than 50%
      const largeArcFlag = slicePercent > 50 ? 1 : 0;

      const pathData = [
        `M 0 0`,
        `L ${x1} ${y1}`,
        `A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`,
      ].join(' ');

      return (
        <path
          key={index}
          d={pathData}
          fill={dataPoint.color}
          transform="translate(50, 50) scale(40)"
        />
      );
    };

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((dataPoint, index) => createPieSlice(dataPoint, index))}
        <circle cx="50" cy="50" r="25" fill="white" />
      </svg>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full md:w-2/5 p-2 py-6 bg-blue-100 flex flex-col justify-between rounded-2xl">
              <div>
              <Link to="/app/dashboard" className="relative  -top-4 text-md flex items-center bg-slate-100 p-2 rounded-md font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300"><ChevronLeft size={20}/> <div>Back</div></Link>                
                 <div className="flex items-center gap-2 pl-5">
              <div className="bg-slate-100 text-white p-1 rounded-md">
                <Award size={30} className='text-black' />
              </div>
              <span className="font-bold text-xl text-blue-500">EasyLearn</span>
            </div>
              <div className="flex my-4 gap-2">
                    <div className='relative'>

                    <div className="w-15 h-15 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      WM
                    </div>
                    <div className="absolute -bottom-2 left-2 bg-green-500 rounded-full w-6 h-6 border-2 border-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className=''>
                    <h3 className="font-bold text-lg">{user?.email}</h3>
                    <p className="text-gray-500 text-sm mb-2">Student</p>
                 </div>
                    </div>
                 
           

            {/* Sidebar Menu */}
            <nav className="space-y-4">
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="font-medium">Performance</span>
              </div>

              <div className="flex items-center gap-3 p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span className="font-medium">Courses</span>
              </div>

              <div className="flex items-center gap-3 p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Comment</span>
              </div>

              <div className="flex items-center gap-3 p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Tools</span>
              </div>

              <div className="flex items-center gap-3 p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span className="font-medium">Resources</span>
              </div>
            </nav>

              </div>
        
            {/* Upgrade Plan and User Profile in Horizontal Layout */}
            <div className="relative bottom-0 flex flex-row gap-4">
              {/* Upgrade Plan */}
              <div className="flex-1 bg-gray-900 text-white p-4 rounded-lg">
                <p className="text-sm">Upgrade your plan.</p>
                <p className="text-sm font-bold">Pro plan</p>
                <div className="mt-4 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              </div>

            

              </div>
              
         {/* Main Content */}
          <div className="w-full ">
            {/* Header */}
           <div className='w-full flex justify-center'>
              <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col items-center justify-center"> {/* Only horizontal centering */}
                    <h1 className="text-2xl font-bold ">Course Activity</h1>
                    <p className="text-blue-500">March 8th, 2025</p>
                  </div>
              </div>
           </div>
             

            {/* Course Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-400">Courses</h2>
                <div className="flex gap-2">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1 px-2">
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Course Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className={`${course.lightColor} p-4 rounded-xl`}>
                    <div className="flex justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`${course.color} text-white p-3 rounded-md`}>
                          <span className="text-xl">{course.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold">{course.title}</h3>
                          <p className="text-sm text-gray-600">Follow these easy and simple steps</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center font-bold">
                        {course.progress}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-white rounded-full h-1">
                        <div className={`${course.color} h-1 rounded-full`} style={{ width: `${course.progress * 5}%` }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">{course.status}</span>
                      <button className="flex items-center gap-1 text-sm">
                        <span>Enroll</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Learning Section */}
            <div className="mb-8">
              <h2 className="text-xl text-gray-400 mb-4">My learning</h2>

              <div className="space-y-4">
                {myLearning.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className={`${item.color} p-2 rounded-full`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>

                    <div className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold">{item.progress}%</span>
                      </div>
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4299e1"
                          strokeWidth="4"
                          strokeDasharray={`${item.progress}, 100`}
                          strokeLinecap="round"
                          transform="rotate(-90, 18, 18)"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             {/* User Profile */}
             <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col items-center text-center">
                  
                  <div className="w-full h-32 mb-2">
                    <PieChart data={performanceData} />
                  </div>

                  <div className="w-full grid grid-cols-3  text-xs">
                    {performanceData.map((item, index) => (
                      <div key={index} className="flex justify-center  items-center">
                        <div className="w-3 h-3 rounded-full mr-1 " style={{ backgroundColor: item.color }}></div>
                        <div className="flex  w-full">
                          <span>{item.name} </span> &nbsp;    
                          <span className="font-bold"> {item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    View Profile
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyLearnDashboard;