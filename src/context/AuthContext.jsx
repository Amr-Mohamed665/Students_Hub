import { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('learnova_user_profile');
    return stored ? JSON.parse(stored) : mockUser;
  });
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
    localStorage.removeItem('learnova_user_profile');
  };

  const chooseRole = (role) => {
    setSelectedRole(role);
    localStorage.setItem('learnova_role', role);
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const nextUser = { ...prev, ...updates };
      localStorage.setItem('learnova_user_profile', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      selectedRole,
      logout,
      chooseRole,
      setUser,
      updateUser,
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
