import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("greenchampsUser"));
  console.log("stored user----->", storedUser);

  const [user, setUser] = useState(storedUser);

  // useEffect(() => {
  //   if (!user) {
  //     const storedUser = JSON.parse(localStorage.getItem("greenchampsUser"));
  //     console.log("stored user----->", storedUser);
  //     if (storedUser) {
  //       setUser(storedUser);
  //     }
  //   }
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
