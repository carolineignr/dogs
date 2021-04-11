import React from 'react';
import axios from 'axios';
import { USER_GET, TOKEN_POST } from './api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const { data } = await axios(url, options).catch(e => console.log(e));

    setData(data);
    setLogged(true);
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });
    const { data } = await axios(url, options).catch(e => console.log(e));

    window.localStorage.setItem("token", data.token)

    getUser(data.token);
  }

  return (
    <UserContext.Provider value={{ userLogin, data, logged }}>
      {children}
    </UserContext.Provider>
  )
}
