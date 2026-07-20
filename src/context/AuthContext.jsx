import { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('learnova_role') || 'student';
  });

  useEffect(() => {
    
    localStorage.removeItem('learnova_user');
    localStorage.removeItem('learnova_authenticated');
  }, []);

  useEffect(() => {
    localStorage.setItem('learnova_authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  const logout = () => {
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.removeItem('learnova_user');
    localStorage.removeItem('learnova_authenticated');
    localStorage.removeItem('learnova_role');
  };

  const chooseRole = (role) => {
    setSelectedRole(role);
    localStorage.setItem('learnova_role', role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      selectedRole,
      logout,
      chooseRole,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
