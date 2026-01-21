'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthMethodType } from '@/features/auth/types';

interface AuthMethodContextValue {
  method: AuthMethodType;
  setMethod: (method: AuthMethodType) => void;
}

const AuthMethodContext = createContext<AuthMethodContextValue | undefined>(
  undefined,
);

export const useAuthMethod = () => {
  const context = useContext(AuthMethodContext);
  if (!context) {
    throw new Error('useAuthMethod must be used within an AuthMethodProvider');
  }
  return context;
};

export const AuthMethodProvider = ({ children }: { children: ReactNode }) => {
  const [method, setMethod] = useState<AuthMethodType>('phone');

  return (
    <AuthMethodContext.Provider value={{ method, setMethod }}>
      {children}
    </AuthMethodContext.Provider>
  );
};
