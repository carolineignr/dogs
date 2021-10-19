import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import { UserContext } from '../UserContext';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';

export const Header = () => {
  const { data, logged, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to='/'>
          <Dogs />
        </Link>
        {logged ? 
        <div>
          <Link className={styles.login} to='/account'>{data.nome}</Link>
          <Link onClick={userLogout} to="/login">Sair</Link>
        </div>
        : <Link className={styles.login} to='/login'>Criar conta / Login</Link>}
      </nav>
    </header>

  )
}

export default Header;
