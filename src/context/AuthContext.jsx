import { useState, useEffect } from 'react';
import {
  subscribeToAuthChanges,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginWithDemoPersona,
  logoutUser,
  isLiveFirebaseConfigured
} from '../services/firebase';
import { AuthContext } from './authContextDef';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login', 'signup', 'demo'

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginWithEmail(email, password);
      setAuthModalOpen(false);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await registerWithEmail(name, email, password);
      setAuthModalOpen(false);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      setAuthModalOpen(false);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const loginPersona = async (type) => {
    setLoading(true);
    try {
      const res = await loginWithDemoPersona(type);
      setAuthModalOpen(false);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } finally {
      setLoading(false);
    }
  };

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLiveFirebase: isLiveFirebaseConfigured,
        authModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        loginGoogle,
        loginPersona,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
