import React, {useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { USER_GET, TOKEN_POST, TOKEN_VALIDATE_POST } from './Api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const navigate = useNavigate();

  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const { data } = await axios(url, options);

    setData(data);
    setLogged(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);

      if (!tokenRes.ok) throw new Error(`Erro: Usuário inválido`);
      
      window.localStorage.setItem("token", data.token);

      await getUser(data.token);

      navigate("/account");
    } catch(err) {
      setError(err.message);
      setLogged(false);
    } finally {
      setLoading(false)
    }
  }

  const userLogout = useCallback(async function() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogged(false);

    window.localStorage.removeItem('token');
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if(!response.ok) throw new Error('Token invalido');

          await getUser(token);
        } catch(error) {
          setError(error.message);
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    
    autoLogin();
  }, [userLogout])

  return (
    <UserContext.Provider 
      value={
        { 
          userLogin,
          userLogout,
          data, 
          logged, 
          loading, 
          error 
        }}>
      {children}
    </UserContext.Provider>
  )
}
