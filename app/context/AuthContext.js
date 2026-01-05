import React, { createContext, useState, useEffect } from "react";
import { saveData, getData, removeData } from "../utils/storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData("user").then(setUser);
  }, []);

  const register = async (newUser) => {
    await saveData("user", newUser);
    setUser(newUser);
  };

  const login = async (email, password) => {
    const storedUser = await getData("user");
    if (storedUser?.email === email && storedUser?.password === password) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await removeData("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
