import { createContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types";
import { getData, removeData, saveData } from "./utils/storage";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getData<User>("user").then(setUser);
  }, []);

  const register = async (email: string, username: string, password: string) => {
    const newUser: User = {
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
    };
    await saveData("user", newUser);
    setUser(newUser);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const storedUser = await getData<User>("user");
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

  const updateProfile = async (email: string, username: string, password?: string | null) => {
    if (!user) return;
    
    const updatedUser: User = {
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
