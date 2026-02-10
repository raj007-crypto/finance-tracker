import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
            
            {/* Profile Section */}
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className='w-20 h-20 bg-slate-400 rounded-full'
                    />
                ) : (
                    <div className='w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 text-2xl font-bold'>
                       {/* Show Initials if no image */}
                       {user?.fullName ? user.fullName[0] : "U"}
                    </div>
                )}
                <h5 className='text-gray-900 font-medium text-lg'>
                    {user?.fullName || "User"}
                </h5>
            </div>

            {/* Menu Items */}
            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    // ✅ FIX 1: Corrected Template Literal syntax & spacing
                    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
                        activeMenu === item.label ? "text-white bg-primary" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    // ✅ FIX 2: Fixed typo 'onclcik' -> 'onClick'
                    onClick={() => handleClick(item.path)}
                >
                    {/* ✅ FIX 3: Render icon as a Component */}
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;