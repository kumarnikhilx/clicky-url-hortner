import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService';

// Create the context object
const AuthContext = createContext(null);

// AuthProvider wraps the entire app and provides auth state to all components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);             // The logged-in user object or null
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // true while checking session on startup

  // On app startup, check if the user already has a valid session cookie.
  // This restores the session after a page refresh.
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
        setIsAuthenticated(true);
      } catch {
        // No valid session — user is a guest
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Handle login: call backend, then update state
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  // Handle register: call backend, then update state
  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  // Handle logout: clear the cookie via backend, then reset state
  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — any component can call useAuth() to get auth state
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
};
