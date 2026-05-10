import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication for the MVP Phase
  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('campusloop_mock_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.endsWith('.edu') || email.includes('student')) {
          const user = {
            uid: 'mock123',
            email: email,
            displayName: email.split('@')[0],
            verified: true
          };
          setCurrentUser(user);
          localStorage.setItem('campusloop_mock_user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Please use a valid college email address."));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('campusloop_mock_user');
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
