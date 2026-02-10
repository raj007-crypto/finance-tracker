import React from 'react';
import Card_2 from "../../assets/images/card_2.png"; // Ensure this path is correct
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className='flex h-screen w-screen overflow-hidden bg-white'>
      
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}

    </div>

      {/* RIGHT SIDE: Decorative Dashboard Preview */}
      {/* Fixed: Added better gradient and z-index handling */}
      <div className='hidden md:flex w-[40vw] h-full flex-col items-center justify-center bg-violet-50 relative overflow-hidden'>
        
        {/* Background Decorative Shapes */}
        <div className="w-64 h-64 rounded-full bg-purple-600/30 blur-3xl absolute -top-10 -left-10 animate-pulse" />
        <div className="w-64 h-64 rounded-full bg-fuchsia-600/20 blur-3xl absolute top-[40%] -right-20" />
        <div className="w-64 h-64 rounded-full bg-violet-500/30 blur-3xl absolute -bottom-10 -left-10" />

        {/* Abstract Geometry */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 opacity-10" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 opacity-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 opacity-10" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center gap-10">
            
            {/* Stats Card - Floating Effect */}
            <div className="transform translate-y-8 translate-x-12"> 
                <StatsInfoCard
                    icon={<LuTrendingUpDown />}
                    label="Track your Incomes & Expenses"
                    value="430,000"
                    color="bg-purple-600"
                />
            </div>

            {/* Main Image - Properly Centered and Shadowed */}
            <img 
                src={Card_2} 
                alt="Dashboard Preview"
                className="w-[85%] max-w-[400px] object-contain drop-shadow-2xl rounded-lg border-4 border-white/50" 
            />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

/* --- Improved Stats Card Component --- */
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-purple-500/10 border border-white min-w-[280px]">
      
      {/* Icon Circle */}
      <div className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${color} rounded-full shadow-lg`}>
        {icon}
      </div>

      {/* Text Content */}
      <div className='flex flex-col'>
        <h6 className="text-sm font-medium text-gray-500 mb-1">{label}</h6>
        <span className="text-2xl font-bold text-gray-800">${value}</span>
      </div>
      
    </div>
  );
};