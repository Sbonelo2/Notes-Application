import { createContext, useEffect, useState } from "react";
import { getData, removeData, saveData } from "./utils/storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData("user").then(setUser);
  }, []);

  const register = async (email, username, password) => {
    const newUser = {
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
    };
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

  const updateProfile = async (email, username, password) => {
    const updatedUser = {
      ...user,
      email,
      username,
      ...(password && { password }),
    };
    await saveData("user", updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
