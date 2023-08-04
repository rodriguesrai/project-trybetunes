import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Carregando from '../Carregando/carregando';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import minhaImagem from './trybetunes.png';

function Login() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const validName = value.trim().length >= 3;

  const handleLogin = async () => {
    setLoading(true);
    try {
      await createUser({ name: value.trim() });
      navigate('/search', { state: { userName: value.trim() } });
    } catch (error) {
      console.error('Error ao salvar usuário', error);
    }
  };

  return (
    <div className="container-parent">
      <img src={ minhaImagem } className="img-container" alt="" />
      <div className="container">
        <label htmlFor="login" className="screen-reader-only">Login</label>
        <div className="input">
          <input
            type="text"
            data-testid="login-name-input"
            id="login"
            value={ value }
            onChange={ handleChange }
            placeholder="Digite seu nome de usuário"
            className="form-control"
          />
        </div>
        <button
          data-testid="login-submit-button"
          disabled={ !validName }
          onClick={ handleLogin }
          className="button-login"
        >
          Entrar
        </button>
        {loading && <Carregando />}
      </div>
    </div>
  );
}

export default Login;
