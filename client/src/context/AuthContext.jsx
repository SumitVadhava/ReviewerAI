import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Custom hook to use the context easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user object
  const [token, setToken] = useState(null);// JWT token
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [hasHydrated, setHasHydrated] = useState(false); 

  // Load user/token from localStorage on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    // setHasHydrated(true);
    setLoading(false)
  }, []);

  const login = (user, jwtToken) => {
    setUser(user);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", jwtToken);
    setIsLoggedIn(true);
    console.log(user);
    console.log(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading,isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;