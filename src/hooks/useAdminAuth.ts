import { useState, useEffect } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'moderator';
  createdAt: string;
}

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin in localStorage
    const savedAdmin = localStorage.getItem('mitra-admin-user');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setIsLoading(false);
  }, []);

  const signIn = (email: string, password: string) => {
    // Demo admin authentication
    const mockAdmin: AdminUser = {
      id: 'admin-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: email.includes('super') ? 'super-admin' : 'moderator',
      createdAt: new Date().toISOString(),
    };
    setAdmin(mockAdmin);
    localStorage.setItem('mitra-admin-user', JSON.stringify(mockAdmin));
    return Promise.resolve(mockAdmin);
  };

  const signUp = (name: string, email: string, password: string, role: 'super-admin' | 'moderator' = 'moderator') => {
    // Demo admin registration
    const mockAdmin: AdminUser = {
      id: 'admin-' + Date.now(),
      name: name,
      email: email,
      role: role,
      createdAt: new Date().toISOString(),
    };
    setAdmin(mockAdmin);
    localStorage.setItem('mitra-admin-user', JSON.stringify(mockAdmin));
    return Promise.resolve(mockAdmin);
  };

  const signOut = () => {
    setAdmin(null);
    localStorage.removeItem('mitra-admin-user');
  };

  const forgotPassword = (email: string) => {
    // Demo forgot password - just reset any existing admin data
    localStorage.removeItem('mitra-admin-user');
    return Promise.resolve({ message: 'Password reset instructions sent to your email.' });
  };

  return {
    admin,
    isLoading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
  };
};