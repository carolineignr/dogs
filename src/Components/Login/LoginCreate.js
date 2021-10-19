import React, { useContext } from 'react';
import useForm from '../../Hooks/useForm';
import Error from '../../Helper/Error';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { USER_POST } from '../../Api';
import { useFetch } from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';

export const LoginCreate = () => {
  const { userLogin } = useContext(UserContext);
  const username = useForm();
  const password = useForm("password");
  const email = useForm("email");

  const {loading, error, request} = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      username: username.value,
      password: password.value,
      email: email.value
    }
    
    const { url, options } = USER_POST(body);
    const { response } = await request(url, options);

    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Nome do usuário" type="username" name="username" {...username} />
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? 
          <Button disabled>Cadastrando usuário...</Button> 
          : <Button>Criar novo usuário</Button>
        }
      </form>
      <Error error={error}/>
      {console.log(error)}
    </section>
  )
}

export default LoginCreate;
