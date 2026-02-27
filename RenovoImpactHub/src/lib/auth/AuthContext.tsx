'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, SDGId } from '@/types';
import { mockUser } from '@/lib/mock/data';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateSdgFocus: (sdgs: SDGId[]) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore from localStorage on mount
    const stored = localStorage.getItem('renovo-user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({ ...parsed, createdAt: new Date(parsed.createdAt) });
      } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const persistUser = useCallback((u: User) => {
    setUser(u);
    localStorage.setItem('renovo-user', JSON.stringify(u));
    document.cookie = 'renovo-auth-token=mock-token; path=/; max-age=86400';
  }, []);

  const login = useCallback(async (_email: string, _password: string) => {
    // Mock: always log in as demo user
    await new Promise(r => setTimeout(r, 500)); // simulate network
    persistUser(mockUser);
  }, [persistUser]);

  const signup = useCallback(async (email: string, _password: string, name: string) => {
    await new Promise(r => setTimeout(r, 500));
    const newUser: User = { ...mockUser, email, name, id: 'user-' + Date.now() };
    persistUser(newUser);
  }, [persistUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('renovo-user');
    document.cookie = 'renovo-auth-token=; path=/; max-age=0';
  }, []);

  const updateSdgFocus = useCallback((sdgs: SDGId[]) => {
    if (user) {
      const updated = { ...user, sdgFocus: sdgs };
      persistUser(updated);
    }
  }, [user, persistUser]);

  const isAdmin = user?.email === 'admin@renovo.org';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, signup, logout, updateSdgFocus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
