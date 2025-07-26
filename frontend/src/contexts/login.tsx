import { createContext, useContext, useState, useEffect } from "react";
import { axiosJsonwithAuth } from "../lib/api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const url = `http://localhost:8000/api/users/referesh/`;
        const user = await axiosJsonwithAuth(url);
        setIsLoggedin(true);
      } catch (err) {
        setIsLoggedin(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedin, setIsLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
