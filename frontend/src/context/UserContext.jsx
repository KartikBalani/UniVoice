import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("Guest");
  const [userRoll, setUserRoll] = useState(null);
  const [access,setAccess] = useState(null)// <-- Added userID state

  return (
    <UserContext.Provider value={{ userType, setUserType, userRoll, setUserRoll, access,setAccess }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
