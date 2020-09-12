import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string;
  church: ChurchProps;
  signIn(credentials: LoginCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  church: ChurchProps;
}

interface ChurchProps {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ChurchReserves:token');
    const church = localStorage.getItem('@ChurchReserves:church');

    if (token && church) {
      return { token, church: JSON.parse(church) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ user: username, password }) => {
    const response = await api.post('sessions', { user: username, password });
    const { token, church } = response.data;

    localStorage.setItem('@ChurchReserves:token', token);
    localStorage.setItem('@ChurchReserves:church', JSON.stringify(church));

    setData({ token, church });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ChurchReserves:token');
    localStorage.removeItem('@ChurchReserves:church');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, church: data.church, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
