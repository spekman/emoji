import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const API_URL = 'http://192.168.15.9:8080';

interface AuthData {
  token: string;
  username: string;
  petId: number;
  petName: string;
  petBaseEmoji: string;
}

interface AuthContextType {
  authData: AuthData | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_data');
    delete axios.defaults.headers.common['Authorization'];
    setAuthData(null);
  };

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedAuth = await SecureStore.getItemAsync('auth_data');
        if (storedAuth) {
          const parsedData = JSON.parse(storedAuth);
          setAuthData(parsedData);
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsedData.token}`;
        }
      } catch (e) {
        console.error("Erro ao carregar dados do SecureStore", e);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response, 
      async (error) => {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          console.warn("Sessão inválida ou expirada no servidor. Forçando logout...");
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      const data: AuthData = response.data;

      await SecureStore.setItemAsync('auth_data', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setAuthData(data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Falha no login. Verifique as credenciais.");
    }
  };

  return (
    <AuthContext.Provider value={{ authData, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);