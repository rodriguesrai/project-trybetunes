import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Carregando from '../Carregando/carregando';

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
    <div>
      <label htmlFor="login">Login</label>
      <input
        type="text"
        data-testid="login-name-input"
        id="login"
        value={ value }
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-button"
        disabled={ !validName }
        onClick={ handleLogin }
      >
        Entrar
      </button>
      {loading && <Carregando />}
    </div>
  );
}

export default Login;
