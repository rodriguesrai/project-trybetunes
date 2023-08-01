import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Carregando from '../Carregando/carregando';

function Header() {
  const [carregando, setCarregando] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await getUser();
        setUserName(user.name);
      } finally {
        setCarregando(false);
      }
    };
    fetch();
  }, []);

  return (
    <header data-testid="header-component">
      {carregando
        ? (<Carregando />) : (<p data-testid="header-user-name">{userName}</p>) }
      <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
    </header>
  );
}
export default Header;
