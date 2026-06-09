import React, { createContext, useContext, useState, useEffect } from "react";
import type { LoginResponseModel } from "../modals/LoginResponseModel";
import { getUser, setUser, removeUser } from "../utils/LocalStorage";

interface AuthContextType {
  user: LoginResponseModel["data"]["user"] | null;
  token: string | null;
  login: (data: LoginResponseModel) => void;
  logout: () => void;
  updateUser: (data: Partial<LoginResponseModel["data"]["user"]>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<LoginResponseModel["data"]["user"] | null>(null);
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    console.log("AuthContext: Loading user from localStorage...");
    const storedUserData = getUser();
    console.log("AuthContext: Stored user data:", storedUserData);
    
    if (storedUserData && storedUserData.data) {
      console.log("AuthContext: Setting user state from localStorage");
      setUserState(storedUserData.data.user);
      setTokenState(storedUserData.data.token);
    }
  }, []);

  const login = (data: LoginResponseModel) => {
    console.log("AuthContext: login() called with data:", data);
    
    if (data && data.data) {
      const userData = data.data.user;
      const tokenData = data.data.token;
      
      console.log("AuthContext: Extracted user:", userData);
      console.log("AuthContext: Extracted token:", tokenData);
      
      setUserState(userData);
      setTokenState(tokenData);
      
      setUser(data);
      console.log("AuthContext: User data saved to localStorage");
    } else {
      console.error("AuthContext: Invalid login data structure:", data);
    }
  };

  const logout = () => {
    console.log("AuthContext: logout() called");
    setUserState(null);
    setTokenState(null);
    removeUser();
  };

  const updateUser = (data: Partial<LoginResponseModel["data"]["user"]>) => {
    console.log("AuthContext: updateUser() called with:", data);
    setUserState((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      
      const currentData = getUser();
      if (currentData && currentData.data) {
        const updatedData = {
          ...currentData,
          data: {
            ...currentData.data,
            user: updated
          }
        };
        setUser(updatedData);
      }
      
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
