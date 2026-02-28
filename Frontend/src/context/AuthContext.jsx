import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  // Read initial auth state synchronously (avoids setState inside useEffect)
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");
  const storedUser = localStorage.getItem("username");
  const initialUser =
    storedToken && storedRole === "admin"
      ? { role: storedRole, username: storedUser }
      : null;

  const [user, setUser] = useState(initialUser);

  // Keep navigateRef in sync with the latest navigate instance
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, role, username: uname } = response.data;
      if (role !== "admin") {
        return {
          success: false,
          message: "Access denied. Admin accounts only.",
        };
      }
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", uname);
      setUser({ role, username: uname });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid username or password.";
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser(null);
    navigateRef.current("/");
  };

  // loading is always false because auth state is read synchronously
  return (
    <AuthContext.Provider value={{ user, login, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
