import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{ // ✅ Fixed typo: 'value' instead of 'vaue'
                user,
                updateUser,
                clearUser,
            }}
        >
            {children}
        </UserContext.Provider>
    ); // ✅ Fixed syntax: Used ( ) instead of { }
};

export default UserProvider; // ✅ Fixed typo: 'default' instead of 'deault'