import React, { createContext, useState, useContext } from 'react';

interface User {
  id: string;
  email: string;
  awsCredentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  setAwsCredentials: (credentials: { accessKeyId: string; secretAccessKey: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // Mock sign-in logic
    setUser({ id: '123', email });
  };

  const signUp = async (email: string, password: string) => {
    // Mock sign-up logic
    setUser({ id: '123', email });
  };

  const signOut = () => {
    setUser(null);
  };

  const setAwsCredentials = (credentials: { accessKeyId: string; secretAccessKey: string }) => {
    if (user) {
      setUser({ ...user, awsCredentials: credentials });
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, setAwsCredentials }}>
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