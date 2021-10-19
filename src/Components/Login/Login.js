import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UserContext } from '../../UserContext';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import styles from './Login.module.css';

export const Login = () => {
  const { logged } = useContext(UserContext);

  if (logged) return <Navigate to="account"/>
  
  return (
    <div className={styles.container}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="lostPassword" element={<LoginPasswordLost />} />
          <Route path="resetPassword" element={<LoginPasswordReset />} />
        </Routes>
      </div>
    </div>
  )
}

export default Login;
