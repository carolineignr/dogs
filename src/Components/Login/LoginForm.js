import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './LoginForm.module.css';
import { UserContext } from '../../UserContext';

export const LoginForm = () => {

  const username = useForm('email');
  const password = useForm(null);

  const { userLogin, data } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="password" {...password} />
          <Button>Entrar</Button>
          <Link to='/login/lostPassword'>Perdeu a Senha?</Link>
        </form>

        <div>
          <h1>Cadastre-se</h1>
          <Link to='/login/create'>Cadastro</Link>
        </div>
      </section>
    </div >
  )
}

export default LoginForm;
