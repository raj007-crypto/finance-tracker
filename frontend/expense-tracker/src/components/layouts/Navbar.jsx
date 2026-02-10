import React, { useState } from 'react';
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi"; // ✅ FIX 1: Capital 'X'
import SideMenu from './SideMenu';

// ✅ FIX 2: Added { activeMenu } prop so it can be passed down
const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            
            <button 
                className='block lg:hidden text-black' 
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" /> // ✅ FIX 1: Used corrected icon
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>

            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

            {openSideMenu && (
                // ✅ FIX 3: Changed 'fixed-top' to 'fixed top'
                <div className='fixed top-[61px] -ml-4 bg-white w-screen h-screen z-50 p-4 border-t'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;