import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import { UserContext } from '../UserContext';
import styles from './Header.module.css';

export const Header = () => {
  const { data, logged } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to='/'>
          <Dogs />
        </Link>
        {logged ? (
          <Link className={styles.login} to='/account'>{data.nome}</Link>
        ) : <Link className={styles.login} to='/login'>Criar conta / Login</Link>}
      </nav>
    </header>

  )
}

export default Header;
