import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role?: 'student' | 'admin';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('mitra-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = (email: string, password: string) => {
    // Simple demo authentication
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: 'student',
    };
    setUser(mockUser);
    localStorage.setItem('mitra-user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const signUp = (name: string, email: string, password: string) => {
    // Simple demo registration
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: 'student',
    };
    setUser(mockUser);
    localStorage.setItem('mitra-user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('mitra-user');
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
};