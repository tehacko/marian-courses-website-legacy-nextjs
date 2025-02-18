'use client';

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("http://localhost:5000/auth/status", {
        credentials: "include",
      });
      const data = await res.json();
      console.log('Session check:', data); // Add this line for debugging
      if (data.authenticated) {
        setAuthenticated(true);
        setIsAdmin(data.isAdmin);
      } else {
        setAuthenticated(false);
        setIsAdmin(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, authenticated, setIsAdmin, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);