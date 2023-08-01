import { useState } from 'react';
import Carregando from '../Carregando/carregando';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';

function Search() {
  const [value, setValue] = useState(''); // useState do input
  const [loading, setLoading] = useState(false); // useState do carregando
  const [showInput, setShowInput] = useState(true); // esconde input
  const [showResult, setShowResult] = useState(false);
  const [artistName, setArtistName] = useState('');

  const validName = value.trim().length >= 2; // disabled botão

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { // onChange input
    setValue(event.target.value);
  };

  const handleSearch = async () => {
    if (validName) {
      setShowInput(false);
      setLoading(true);
      try {
        await searchAlbumsAPI(value);
        setArtistName(value);
      } catch (error) {
        console.error('Error ao pesquisar', error);
      } finally {
        setLoading(false);
        setShowInput(true);
        setShowResult(true);
        setValue('');
      }
    }
  };

  return (
    <div>
      {showInput && (
        <div>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            data-testid="search-artist-input"
            id="search"
            value={ value }
            onChange={ handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ !validName }
            onClick={ handleSearch }
          >
            Pesquisar
          </button>
        </div>
      )}
      {loading && <Carregando />}
      {showResult && (
        <div>
          <p>
            {`Resultado de álbuns de: ${artistName}`}
          </p>
        </div>
      )}

    </div>
  );
}

export default Search;
