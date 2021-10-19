import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../../Helper/Error';
import useForm from '../../Hooks/useForm';
import styles from './LoginForm.module.css';
import stylesBtn from '../../Components/Forms/Button.module.css';
import { UserContext } from '../../UserContext';

export const LoginForm = () => {
  const username = useForm('email');
  const password = useForm(null);

  const { userLogin, loading, error } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <div>
      <section className="animeLeft">
        <h1 className="title">Login</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="password" {...password} />
          { loading ? <Button disabled>Carregando</Button> : <Button>Entrar</Button> }
          <Error error={error}/>
        </form>

        <Link className={styles.lostPass} to='/login/lostPassword'>
          Perdeu a Senha?
        </Link>

        <div className={styles.register}>
          <h2 className="subtitle">Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <Link className={stylesBtn.button} to='/login/create'>
            Cadastro
          </Link>
        </div>
      </section>
    </div >
  )
}

export default LoginForm;
