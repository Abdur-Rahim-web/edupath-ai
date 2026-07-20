'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  enrolledCourses?: any[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // Start as true so pages don't flicker to "unauthenticated" on load
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * On mount, call /api/auth/me to restore session from the HttpOnly cookie.
   * If the cookie is valid the user is restored silently; otherwise loading
   * finishes and the user remains null (not logged in).
   */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        // Network error — leave user as null
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const refreshSession = async (): Promise<void> => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch {
      // best-effort
    }
  };

  /** Called after a successful login / demo login. */
  const login = async (userData: User): Promise<void> => {
    setUser(userData);
  };

  /**
   * Calls /api/auth/logout to clear the HttpOnly cookie, then clears
   * the in-memory state. Works correctly on refresh since the cookie
   * is gone and /api/auth/me will return 401.
   */
  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // best-effort — still clear local state
    } finally {
      setUser(null);
    }
  };

  const register = async (_userData: any): Promise<void> => {
    // Registration is handled directly in the form component
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
